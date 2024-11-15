import { createContext, useContext } from 'react';
import { FieldValues } from 'react-hook-form';

import { ZodTypeAny } from 'zod';

import { CryptoAssetProtocol, CryptoCurrency, Money } from '@leather.io/models';

export interface SendFormContext {
  protocol: CryptoAssetProtocol;
  symbol: CryptoCurrency;
  availableBalance: Money;
  fiatBalance: Money;
  defaultValues: FieldValues;
  schema: ZodTypeAny;
}

const sendFormContext = createContext<SendFormContext | null>(null);

export const SendFormProvider = sendFormContext.Provider;

export function useSendFormContext() {
  const context = useContext(sendFormContext);
  if (!context) throw new Error('`useSendFormContext` must be used within a `SendFormProvider`');
  return context;
}