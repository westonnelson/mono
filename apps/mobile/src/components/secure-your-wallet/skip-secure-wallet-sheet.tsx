import { RefObject } from 'react';

import { t } from '@lingui/macro';

import { SheetRef } from '@leather.io/ui/native';

import { WarningSheetLayout } from '../sheets/warning-sheet.layout';

interface SkipSecureWalletSheetProps {
  sheetRef: RefObject<SheetRef>;
  onSubmit(): void;
}
export function SkipSecureWalletSheet({ sheetRef, onSubmit }: SkipSecureWalletSheetProps) {
  return (
    <WarningSheetLayout
      sheetRef={sheetRef}
      title={t({
        id: 'skip_secure_wallet.header_title',
        message: `Proceed without security`,
      })}
      description={t({
        id: 'skip_secure_wallet.warning_caption',
        message: `Skipping security setup means your wallet will not be protected by your device’s security features. We highly recommend enabling security to protect your assets`,
      })}
      onSubmit={onSubmit}
    />
  );
}
