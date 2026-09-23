import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { requireOptionalNativeModule } from 'expo-modules-core';

import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';
import ur from './locales/ur.json';
import { DEFAULT_LANGUAGE, LANGUAGES } from './languages';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ar: { translation: ar },
  ur: { translation: ur },
};

// Falls back to the device locale on first launch, before any saved
// preference exists — matches only against our 4 supported codes.
// `expo-localization` itself calls the *throwing* requireNativeModule at its
// own top level, so even a guarded `require('expo-localization')` still
// surfaces as a fatal error in dev when its native module isn't in the
// running binary yet (e.g. right after adding the package, before the next
// EAS/dev-client rebuild). Checking with the *optional* lookup first avoids
// ever touching that package when it isn't there yet.
function getDeviceLanguage() {
  if (!requireOptionalNativeModule('ExpoLocalization')) {
    return DEFAULT_LANGUAGE;
  }

  const Localization = require('expo-localization');
  const deviceCode = Localization.getLocales()[0]?.languageCode;
  return LANGUAGES.some((lang) => lang.code === deviceCode) ? deviceCode : DEFAULT_LANGUAGE;
}

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v4',
});

export default i18n;
