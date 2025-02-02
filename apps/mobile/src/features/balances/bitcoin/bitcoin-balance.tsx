import {
  useBitcoinAccountTotalBitcoinBalance,
  useWalletTotalBitcoinBalance,
} from '@/queries/balance/bitcoin-balance.query';

import { Money } from '@leather.io/models';
import { BtcAvatarIcon, PressableProps } from '@leather.io/ui/native';

import { TokenBalance } from '../token-balance';

interface BitcoinTokenBalanceProps extends PressableProps {
  availableBalance: Money;
  fiatBalance: Money;
  onPress?(): void;
}
export function BitcoinTokenBalance({
  availableBalance,
  fiatBalance,
  onPress,
  ...rest
}: BitcoinTokenBalanceProps) {
  return (
    <TokenBalance
      ticker="BTC"
      icon={<BtcAvatarIcon />}
      // tokenName={t({
      //   id: 'asset_name.bitcoin',
      //   message: 'Bitcoin',
      // })}
      // FIXME: LEA-1780 Re-enable this when Crowdin issues solved
      // eslint-disable-next-line no-console, lingui/no-unlocalized-strings
      tokenName="Bitcoin"
      protocol="nativeBtc"
      fiatBalance={fiatBalance}
      availableBalance={availableBalance}
      onPress={onPress}
      {...rest}
    />
  );
}

export function BitcoinBalance() {
  const { availableBalance, fiatBalance } = useWalletTotalBitcoinBalance();
  return (
    <BitcoinTokenBalance
      availableBalance={availableBalance}
      fiatBalance={fiatBalance}
      px="5"
      py="3"
    />
  );
}

interface BitcoinBalanceByAccountProps {
  accountIndex: number;
  fingerprint: string;
  onPress?(): void;
}
export function BitcoinBalanceByAccount({
  accountIndex,
  fingerprint,
  onPress,
}: BitcoinBalanceByAccountProps) {
  const { availableBalance, fiatBalance } = useBitcoinAccountTotalBitcoinBalance({
    accountIndex,
    fingerprint,
  });
  return (
    <BitcoinTokenBalance
      availableBalance={availableBalance}
      fiatBalance={fiatBalance}
      onPress={onPress}
      px="5"
      py="3"
    />
  );
}
