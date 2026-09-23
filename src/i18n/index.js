import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

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
// preference exists — matches only against our 4 supported codes. Guarded
// because the native module is only present after a build that includes it
// (e.g. right after adding the package, before the next EAS/dev-client
// rebuild) — this must never crash app boot.
function getDeviceLanguage() {
  try {
    const deviceCode = Localization.getLocales()[0]?.languageCode;
    return LANGUAGES.some((lang) => lang.code === deviceCode) ? deviceCode : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v4',
});

export default i18n;
