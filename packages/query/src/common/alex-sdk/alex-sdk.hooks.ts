import React, { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AlexSDK, Currency as TokenId, type TokenInfo } from 'alex-sdk';
import BigNumber from 'bignumber.js';

import {
  Currency,
  MarketData,
  Money,
  createMarketData,
  createMarketPair,
} from '@leather.io/models';
import {
  convertAmountToFractionalUnit,
  createMoney,
  getPrincipalFromContractId,
  isDefined,
  sortAssetsByName,
} from '@leather.io/utils';

import { useStxAvailableUnlockedBalance } from '../../stacks/balance/account-balance.hooks';
import { useTransferableSip10Tokens } from '../../stacks/sip10/sip10-tokens.hooks';
import { useAlexSdkLatestPricesQuery } from './alex-sdk-latest-prices.query';
import {
  createGetAlexSwappableCurrenciesQueryOptions,
  useGetAlexSwappableCurrenciesQuery,
} from './alex-sdk-swappable-currency.query';

export const alex = new AlexSDK();

export interface SwapAsset {
  address?: string;
  balance: Money;
  tokenId: Currency;
  displayName?: string;
  fallback: string;
  icon: React.ReactNode;
  name: string;
  marketData: MarketData | null;
  principal: string;
}

export const defaultSwapFee = createMoney(1000000, 'STX');

export function useAlexCurrencyPriceAsMarketData() {
  const { data: supportedCurrencies = [] } = useGetAlexSwappableCurrenciesQuery();
  const { data: prices } = useAlexSdkLatestPricesQuery();

  return useCallback(
    (principal: string, symbol: string) => {
      const tokenInfo = supportedCurrencies
        .filter(isDefined)
        .find(token => getPrincipalFromContractId(token.underlyingToken) === principal);
      if (!prices || !tokenInfo)
        return createMarketData(createMarketPair(symbol, 'USD'), createMoney(0, 'USD'));
      const currency = tokenInfo.id;
      const price = convertAmountToFractionalUnit(new BigNumber(prices[currency] ?? 0), 2);
      return createMarketData(createMarketPair(symbol, 'USD'), createMoney(price, 'USD'));
    },
    [prices, supportedCurrencies]
  );
}

function useCreateSwapAsset(address: string) {
  const { data: prices } = useAlexSdkLatestPricesQuery();
  const priceAsMarketData = useAlexCurrencyPriceAsMarketData();
  const availableUnlockedBalance = useStxAvailableUnlockedBalance(address);
  const sip10Tokens = useTransferableSip10Tokens(address);

  return useCallback(
    (tokenInfo?: TokenInfo): SwapAsset | undefined => {
      if (!prices) return;
      if (!tokenInfo) return;

      const principal = getPrincipalFromContractId(tokenInfo.underlyingToken);

      const availableBalance = sip10Tokens.find(
        token => token.info.contractId === tokenInfo.underlyingToken
      )?.balance.availableBalance;

      const swapAsset = {
        tokenId: tokenInfo.id,
        fallback: tokenInfo.name.slice(0, 2),
        icon: tokenInfo.icon,
        name: tokenInfo.name,
        principal,
      };

      if (tokenInfo.id === TokenId.STX) {
        return {
          ...swapAsset,
          balance: availableUnlockedBalance,
          displayName: 'Stacks',
          marketData: priceAsMarketData(principal, availableUnlockedBalance.symbol),
        };
      }

      return {
        ...swapAsset,
        balance:
          availableBalance ?? createMoney(0, tokenInfo.name, tokenInfo.underlyingTokenDecimals),
        marketData: availableBalance
          ? priceAsMarketData(principal, availableBalance.symbol)
          : priceAsMarketData(principal, tokenInfo.name),
      };
    },
    [availableUnlockedBalance, priceAsMarketData, prices, sip10Tokens]
  );
}

export function useAlexSwappableAssets(address: string) {
  const createSwapAsset = useCreateSwapAsset(address);
  return useQuery({
    ...createGetAlexSwappableCurrenciesQueryOptions(),
    select: resp => sortAssetsByName(resp.map(createSwapAsset).filter(isDefined)),
  });
}
