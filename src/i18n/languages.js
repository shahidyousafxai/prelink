import { colors } from '../theme/theme';

// Single source of truth for the 4 supported languages — used by the
// language pickers (onboarding + Settings), the RTL flip logic, and
// locale-aware date formatting. `locale` is a full BCP-47 tag for
// `Intl`/`toLocaleDateString` calls; `code` is the i18next language key.
// `accent` gives each language picker card its own identity color (reusing
// existing theme colors, not new ones) instead of 4 identical white cards.
export const LANGUAGES = [
  { code: 'en', native: 'English', label: 'English', rtl: false, locale: 'en-US', accent: colors.pine },
  { code: 'ar', native: 'العربية', label: 'Arabic', rtl: true, locale: 'ar-EG', accent: colors.gold },
  { code: 'fr', native: 'Français', label: 'French', rtl: false, locale: 'fr-FR', accent: colors.clay },
  { code: 'ur', native: 'اردو', label: 'Urdu', rtl: true, locale: 'ur-PK', accent: colors.ink },
];

export const DEFAULT_LANGUAGE = 'en';

export function getLanguageMeta(code) {
  return LANGUAGES.find((lang) => lang.code === code) ?? LANGUAGES[0];
}
