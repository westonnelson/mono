import { useBtcMarketDataQuery } from '@/queries/market-data/btc-market-data.query';
import { t } from '@lingui/macro';

import { PsbtInput, PsbtOutput } from '@leather.io/bitcoin';
import { Box, Text } from '@leather.io/ui/native';
import { baseCurrencyAmountInQuote, createMoney } from '@leather.io/utils';

import { UtxoRow } from './utxo-row';

interface InputsAndOutputsCardProps {
  inputs: PsbtInput[];
  outputs: PsbtOutput[];
}

export function InputsAndOutputsCard({ inputs, outputs }: InputsAndOutputsCardProps) {
  const { data: btcMarketData } = useBtcMarketDataQuery();

  function addBalance<T extends PsbtInput | PsbtOutput>(inputOutput: T) {
    const btcBalance = createMoney(Number(inputOutput.value), 'BTC');
    const usdBalance = btcMarketData
      ? baseCurrencyAmountInQuote(btcBalance, btcMarketData)
      : createMoney(0, 'USD');
    return {
      ...inputOutput,
      btcBalance,
      usdBalance,
    };
  }

  const inputsWithBalance = inputs.map(addBalance);

  const outputsWithBalance = outputs.map(addBalance);
  return (
    <>
      <Text variant="label01">
        {t({
          id: 'approver.inputs-outputs.title',
          message: 'Inputs and Outputs',
        })}
      </Text>
      <Text variant="label01">
        {t({
          id: 'approver.inputs-outputs.input.title',
          message: 'Input',
        })}
      </Text>
      <Box gap="4">
        {inputsWithBalance.map(input => (
          <UtxoRow
            key={input.txid + input.address + input.btcBalance.amount}
            txid={input.txid}
            address={input.address}
            btcBalance={input.btcBalance}
            usdBalance={input.usdBalance}
            isLocked
          />
        ))}
      </Box>
      <Text variant="label01">
        {t({
          id: 'approver.inputs-outputs.output.title',
          message: 'Output',
        })}
      </Text>
      <Box gap="4">
        {outputsWithBalance.map(output => (
          <UtxoRow
            key={output.address + output.btcBalance.amount}
            address={output.address}
            btcBalance={output.btcBalance}
            usdBalance={output.usdBalance}
            isLocked
          />
        ))}
      </Box>
    </>
  );
}
