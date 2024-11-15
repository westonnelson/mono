import { ScrollView } from 'react-native-gesture-handler';

import { FullHeightSheetHeader } from '@/components/full-height-sheet/full-height-sheet-header';
import { FullHeightSheetLayout } from '@/components/full-height-sheet/full-height-sheet.layout';
import { NetworkBadge } from '@/components/network-badge';
import { BitcoinBalanceByAccount } from '@/features/balances/bitcoin/bitcoin-balance';
import { StacksBalanceByAccount } from '@/features/balances/stacks/stacks-balance';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';

import { Theme } from '@leather.io/ui/native';

import { SendSheetNavigatorParamList } from '../send-sheet-navigator';

export type SelectAssetRouteProp = RouteProp<SendSheetNavigatorParamList, 'send-select-asset'>;

export function SelectAssetSheet() {
  const { i18n } = useLingui();
  const route = useRoute<SelectAssetRouteProp>();
  const navigation = useNavigation<NavigationProp<SendSheetNavigatorParamList>>();
  const theme = useTheme<Theme>();

  const account = route.params.account;
  const { accountIndex, fingerprint, name } = account;

  return (
    <FullHeightSheetLayout
      header={
        <FullHeightSheetHeader
          title={t({
            id: 'select_asset.header_title',
            message: 'Select asset',
          })}
          subtitle={i18n._({
            id: 'select_asset.header_subtitle',
            message: '{subtitle}',
            values: { subtitle: name },
          })}
          rightElement={<NetworkBadge />}
        />
      }
    >
      <ScrollView contentContainerStyle={{ gap: theme.spacing['3'] }}>
        <BitcoinBalanceByAccount
          accountIndex={accountIndex}
          fingerprint={fingerprint}
          onPress={() => navigation.navigate('send-form-btc', { account })}
        />
        <StacksBalanceByAccount
          accountIndex={accountIndex}
          fingerprint={fingerprint}
          onPress={() => navigation.navigate('send-form-stx', { account })}
        />
      </ScrollView>
    </FullHeightSheetLayout>
  );
}