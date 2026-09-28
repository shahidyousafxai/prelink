import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import OnboardingWizardLayout from '../../../components/OnboardingWizardLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import LanguageOption from '../../../components/LanguageOption';
import { LANGUAGES } from '../../../i18n/languages';
import { useLanguageQuery, useSetLanguageMutation } from '../../../network/language/languageQueries';
import { styles } from './styles';

export default function LanguageScreen({ navigation }) {
  const { t } = useTranslation();
  const { language } = useLanguageQuery();
  const setLanguage = useSetLanguageMutation();

  return (
    <OnboardingWizardLayout
      step={1}
      totalSteps={3}
      primaryLabel={t('onboarding.language.continue')}
      onPrimaryPress={() => navigation.navigate('OnboardingConsent')}
    >
      <ScreenHeader headline={t('onboarding.language.headline')} sub={t('onboarding.language.sub')} />

      <View style={styles.grid}>
        {LANGUAGES.map((lang) => (
          <LanguageOption
            key={lang.code}
            native={lang.native}
            label={lang.label}
            rtl={lang.rtl}
            accent={lang.accent}
            selected={language === lang.code}
            selectedText={t('common.selected')}
            onPress={() => setLanguage.mutate(lang.code)}
          />
        ))}
      </View>
    </OnboardingWizardLayout>
  );
}
