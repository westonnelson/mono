import { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CircleQuestionMark from '@/assets/circle-questionmark.svg';
import Lock from '@/assets/lock.svg';
import { Button } from '@/components/button';
import { SkipSecureWalletModal } from '@/components/secure-your-wallet/skip-secure-wallet-modal';
import { useToastContext } from '@/components/toast/toast-context';
import { TransText } from '@/components/trans-text';
import { APP_ROUTES } from '@/constants';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { t } from '@lingui/macro';
import { useTheme } from '@shopify/restyle';
import { useRouter } from 'expo-router';

import { Box, Theme, TouchableOpacity } from '@leather.io/ui/native';

export default function () {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme<Theme>();
  const skipSecureWalletModalRef = useRef<BottomSheetModal>(null);
  const router = useRouter();
  const toastContext = useToastContext();

  function createWallet() {
    toastContext.displayToast({ type: 'success', title: 'Wallet added successfully' });
  }
  return (
    <Box
      flex={1}
      backgroundColor="base.ink.background-primary"
      px="5"
      justifyContent="space-between"
      style={{ paddingBottom: bottom + theme.spacing['5'] }}
    >
      <Box gap="3" pt="5">
        <TouchableOpacity
          onPress={() => {
            // TODO: show some kind of a helper here
          }}
          p="5"
          position="absolute"
          right={-theme.spacing['5']}
          zIndex={10}
          top={theme.spacing['1']}
        >
          <CircleQuestionMark
            height={16}
            width={16}
            color={theme.colors['base.ink.text-primary']}
          />
        </TouchableOpacity>
        <TransText variant="heading03">SECURE YOUR WALLET</TransText>
        <TransText variant="label01">
          Use your device’s PIN, Face ID, or other biometrics for quick and secure access.
        </TransText>
      </Box>
      <Box justifyContent="center" alignItems="center">
        <Lock height={204} width={204} color={theme.colors['base.ink.text-primary']} />
      </Box>
      <Box>
        <Button
          onPress={async () => {
            skipSecureWalletModalRef.current?.present();
          }}
          pb="4"
          buttonState="ghost"
          title={t`Skip for now`}
        />
        <Button
          onPress={() => {
            // TODO: set high security level
            createWallet();
            router.navigate(APP_ROUTES.WalletHome);
          }}
          buttonState="default"
          title={t`Enable device security`}
        />
      </Box>
      <SkipSecureWalletModal
        onSkip={() => {
          // TODO: set low security level
          createWallet();
          router.navigate(APP_ROUTES.WalletHome);
        }}
        skipSecureWalletModalRef={skipSecureWalletModalRef}
      />
    </Box>
  );
}