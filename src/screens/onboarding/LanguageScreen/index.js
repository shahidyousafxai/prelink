import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import AuthMark from '../../../components/AuthMark';
import LanguageOption from '../../../components/LanguageOption';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import { LANGUAGES } from '../../../i18n/languages';
import { useLanguageQuery, useSetLanguageMutation } from '../../../network/language/languageQueries';
import { styles } from './styles';

export default function LanguageScreen({ navigation }) {
  const { t } = useTranslation();
  const { language } = useLanguageQuery();
  const setLanguage = useSetLanguageMutation();

  return (
    <ScreenLayout center={false}>
      <AuthMark />
      <ScreenHeader headline={t('onboarding.language.headline')} sub={t('onboarding.language.sub')} />

      <View style={styles.grid}>
        {LANGUAGES.map((lang) => (
          <LanguageOption
            key={lang.code}
            native={lang.native}
            label={lang.label}
            rtl={lang.rtl}
            selected={language === lang.code}
            selectedText={t('common.selected')}
            onPress={() => setLanguage.mutate(lang.code)}
          />
        ))}
      </View>

      <View style={styles.spacer} />

      <PrimaryButton label={t('onboarding.language.continue')} onPress={() => navigation.navigate('OnboardingConsent')} />
    </ScreenLayout>
  );
}
