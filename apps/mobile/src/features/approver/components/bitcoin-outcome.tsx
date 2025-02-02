import { BitcoinTokenBalance } from '@/features/balances/bitcoin/bitcoin-balance';
import { useBtcMarketDataQuery } from '@/queries/market-data/btc-market-data.query';
import { t } from '@lingui/macro';

import { Money } from '@leather.io/models';
import { Text } from '@leather.io/ui/native';
import { baseCurrencyAmountInQuote, createMoney } from '@leather.io/utils';

export function BitcoinOutcome({ amount }: { amount: Money }) {
  const { data: btcMarketData } = useBtcMarketDataQuery();

  const fiatBalance = btcMarketData
    ? baseCurrencyAmountInQuote(amount, btcMarketData)
    : createMoney(0, 'USD');

  return (
    <>
      <Text variant="label01">
        {t({
          id: 'approver.outcomes.title1',
          message: "You'll send",
        })}
      </Text>
      <BitcoinTokenBalance availableBalance={amount} fiatBalance={fiatBalance} py="3" />
    </>
  );
}
