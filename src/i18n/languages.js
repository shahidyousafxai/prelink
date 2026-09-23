// Single source of truth for the 4 supported languages — used by the
// language pickers (onboarding + Settings), the RTL flip logic, and
// locale-aware date formatting. `locale` is a full BCP-47 tag for
// `Intl`/`toLocaleDateString` calls; `code` is the i18next language key.
export const LANGUAGES = [
  { code: 'en', native: 'English', label: 'English', rtl: false, locale: 'en-US' },
  { code: 'ar', native: 'العربية', label: 'Arabic', rtl: true, locale: 'ar-EG' },
  { code: 'fr', native: 'Français', label: 'French', rtl: false, locale: 'fr-FR' },
  { code: 'ur', native: 'اردو', label: 'Urdu', rtl: true, locale: 'ur-PK' },
];

export const DEFAULT_LANGUAGE = 'en';

export function getLanguageMeta(code) {
  return LANGUAGES.find((lang) => lang.code === code) ?? LANGUAGES[0];
}
