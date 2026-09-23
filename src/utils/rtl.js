import { I18nManager } from 'react-native';
import { requireOptionalNativeModule } from 'expo-modules-core';

import { getLanguageMeta } from '../i18n/languages';

// I18nManager only takes effect on the next native reload, so switching to
// or from an RTL language (ar/ur) needs an actual app reload — Updates lets
// that happen in place instead of asking the user to close and reopen.
// The `expo-updates` package itself calls the *throwing* requireNativeModule
// at its own top level, so even a `require('expo-updates')` inside a
// try/catch still surfaces as a fatal error in dev (before the next
// EAS/dev-client rebuild that actually embeds it). Checking with the
// *optional* lookup first avoids ever touching that package when it isn't
// there yet.
export async function applyRTL(code) {
  const { rtl } = getLanguageMeta(code);

  if (rtl === I18nManager.isRTL) {
    return;
  }

  I18nManager.allowRTL(rtl);
  I18nManager.forceRTL(rtl);

  if (!requireOptionalNativeModule('ExpoUpdates')) {
    // Not embedded in the running binary yet — the layout direction still
    // applies on the next manual reload.
    return;
  }

  try {
    const Updates = require('expo-updates');
    await Updates.reloadAsync();
  } catch {
    // Unavailable in Expo Go or a dev build without a channel configured.
  }
}
