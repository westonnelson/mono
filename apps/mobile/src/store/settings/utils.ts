import z from 'zod';

import {
  AccountDisplayPreference,
  AnalyticsPreference,
  BitcoinUnit,
  DefaultNetworkConfigurations,
  EmailAddress,
  FiatCurrency,
} from '@leather.io/models';

export const defaultNetworkPreferences = ['mainnet', 'testnet', 'signet'] as const;
export const defaultThemePreferences = ['light', 'dark', 'system'] as const;

export type ThemePreference = (typeof defaultThemePreferences)[number];
export type Theme = Exclude<ThemePreference, 'system'>;
export type SecurityLevelPreference = 'insecure' | 'secure' | 'not-selected';
export type PrivacyModePreference = 'hidden' | 'visible';
export type LastActiveTimestamp = number | null;

export interface SettingsState {
  accountDisplayPreference: AccountDisplayPreference;
  analyticsPreference: AnalyticsPreference;
  bitcoinUnitPreference: BitcoinUnit;
  createdOn: string;
  emailAddressPreference: EmailAddress;
  fiatCurrencyPreference: FiatCurrency;
  networkPreference: DefaultNetworkConfigurations;
  privacyModePreference: PrivacyModePreference;
  themePreference: ThemePreference;
  securityLevelPreference: SecurityLevelPreference;
  // timestamp
  lastActive: LastActiveTimestamp;
}

// lose schema definition, we don't infer SettingsState type from it to keep it simple
export const settingsSchema = z.object({
  accountDisplayPreference: z.string(),
  analyticsPreference: z.string(),
  bitcoinUnitPreference: z.string(),
  createdOn: z.string(),
  emailAddressPreference: z.string(),
  fiatCurrencyPreference: z.string(),
  networkPreference: z.string(),
  privacyModePreference: z.string(),
  themePreference: z.string(),
  securityLevelPreference: z.string(),
  lastActive: z.union([z.number(), z.null()]),
});
