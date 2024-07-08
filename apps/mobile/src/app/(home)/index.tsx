import { APP_ROUTES } from '@/constants';
import { AppStartMode, whenAppStartMode } from '@/utils/when-app-start-mode';
import { Redirect } from 'expo-router';

export default function Home() {
  return whenAppStartMode(process.env.EXPO_PUBLIC_APP_START_MODE as AppStartMode)({
    live: <Redirect href={APP_ROUTES.WalletAllAssets} />,
    prelaunch: <Redirect href={APP_ROUTES.WaitingList} />,
  });
}