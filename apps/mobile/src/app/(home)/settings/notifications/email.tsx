import { useRef } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { EmailAddressSheet } from '@/features/settings/email-address-sheet';
import { t } from '@lingui/macro';

import {
  Avatar,
  ChevronRightIcon,
  EmailIcon,
  Flag,
  ItemLayout,
  SheetRef,
} from '@leather.io/ui/native';

import SettingsScreenLayout from '../settings-screen.layout';

export default function SettingsNotificationsEmailScreen() {
  const emailAddressSheetRef = useRef<SheetRef>(null);

  return (
    <>
      <SettingsScreenLayout>
        <TouchableOpacity
          onPress={() => {
            emailAddressSheetRef.current?.present();
          }}
        >
          <Flag
            img={
              <Avatar>
                <EmailIcon />
              </Avatar>
            }
          >
            <ItemLayout
              actionIcon={<ChevronRightIcon variant="small" />}
              captionLeft={t`Awaiting verification`}
              titleLeft={t`Email address`}
            />
          </Flag>
        </TouchableOpacity>
      </SettingsScreenLayout>
      <EmailAddressSheet sheetRef={emailAddressSheetRef} />
    </>
  );
}