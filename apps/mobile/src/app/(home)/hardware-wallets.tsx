import { useRef, useState } from 'react';

import { AnimatedHeaderScreenLayout } from '@/components/headers/animated-header/animated-header-screen.layout';
import {
  NotifyUserSheetData,
  NotifyUserSheetLayout,
} from '@/components/sheets/notify-user-sheet.layout';
import { t } from '@lingui/macro';

import {
  Box,
  Cell,
  LogoHardwareBitkey,
  LogoHardwareFoundation,
  LogoHardwareLedger,
  LogoHardwareOnekey,
  LogoHardwareRyder,
  LogoHardwareTrezor,
  SheetRef,
} from '@leather.io/ui/native';

function getUnavailableFeatures() {
  return {
    bitkey: {
      title: t({
        id: 'hardware_wallets.bitkey',
        message: 'Bitkey',
      }),
      icon: <LogoHardwareBitkey />,
    },
    capsule: {
      title: t({
        id: 'hardware_wallets.ledger',
        message: 'Ledger',
      }),
      icon: <LogoHardwareLedger />,
    },
    copper: {
      title: t({
        id: 'hardware_wallets.onekey',
        message: 'OneKey',
      }),
      icon: <LogoHardwareOnekey />,
    },
    fireblocks: {
      title: t({
        id: 'hardware_wallets.passport',
        message: 'Passport',
      }),
      icon: <LogoHardwareFoundation />,
    },
    foredefi: {
      title: t({
        id: 'hardware_wallets.ryder',
        message: 'Ryder',
      }),
      icon: <LogoHardwareRyder />,
    },
    portal: {
      title: t({
        id: 'hardware_wallets.trezor',
        message: 'Trezor',
      }),
      icon: <LogoHardwareTrezor />,
    },
  };
}

export default function HardwareWalletListScreen() {
  const sheetRef = useRef<SheetRef>(null);
  const [sheetData, setSheetData] = useState<NotifyUserSheetData | null>(null);

  function onOpenSheet(option: NotifyUserSheetData) {
    setSheetData(option);
    sheetRef.current?.present();
  }

  function onCloseSheet() {
    setSheetData(null);
  }

  return (
    <>
      <AnimatedHeaderScreenLayout
        title={t({
          id: 'hardware_wallets.title',
          message: 'Connect device',
        })}
      >
        <Box gap="3">
          {Object.entries(getUnavailableFeatures()).map(featureEntry => {
            const [featureKey, feature] = featureEntry;
            const hardwareWalletName = feature.title;
            function onPress() {
              onOpenSheet({
                title: t({
                  id: 'notify_user.hardware_wallets.header_title',
                  message: `Connect hardware wallet: ${hardwareWalletName}`,
                }),
              });
            }
            return (
              <Cell.Root
                key={featureKey}
                title={feature.title}
                icon={feature.icon}
                onPress={onPress}
              >
                <Cell.Chevron />
              </Cell.Root>
            );
          })}
        </Box>
      </AnimatedHeaderScreenLayout>
      <NotifyUserSheetLayout
        onCloseSheet={onCloseSheet}
        sheetData={sheetData}
        sheetRef={sheetRef}
      />
    </>
  );
}
