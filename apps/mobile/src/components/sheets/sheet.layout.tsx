import { ReactNode, RefObject } from 'react';

import { useSettings } from '@/store/settings/settings';
import { HasChildren } from '@/utils/types';

import { Avatar, Box, Sheet, SheetHeader, SheetRef } from '@leather.io/ui/native';

interface SheetLayoutProps extends HasChildren {
  icon: ReactNode;
  sheetRef: RefObject<SheetRef>;
  title: string;
}
export function SheetLayout({ children, icon, sheetRef, title }: SheetLayoutProps) {
  const { themeDerivedFromThemePreference } = useSettings();

  return (
    <Sheet ref={sheetRef} themeVariant={themeDerivedFromThemePreference}>
      <Box gap="3" pt="4" px="5">
        <SheetHeader icon={<Avatar>{icon}</Avatar>} onPressSupport={() => {}} title={title} />
        {children}
      </Box>
    </Sheet>
  );
}
