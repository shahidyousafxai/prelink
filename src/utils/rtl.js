import { I18nManager } from 'react-native';
import * as Updates from 'expo-updates';

import { getLanguageMeta } from '../i18n/languages';

// I18nManager only takes effect on the next native reload, so switching to
// or from an RTL language (ar/ur) needs an actual app reload — Updates lets
// that happen in place instead of asking the user to close and reopen.
export async function applyRTL(code) {
  const { rtl } = getLanguageMeta(code);

  if (rtl === I18nManager.isRTL) {
    return;
  }

  I18nManager.allowRTL(rtl);
  I18nManager.forceRTL(rtl);

  try {
    await Updates.reloadAsync();
  } catch {
    // Updates.reloadAsync is unavailable in Expo Go / dev builds without a
    // channel configured — the layout direction still applies on the next
    // manual reload.
  }
}
