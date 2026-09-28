import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import LanguageOption from '../../../components/LanguageOption';
import { LANGUAGES } from '../../../i18n/languages';
import { useLanguageQuery, useSetLanguageMutation } from '../../../network/language/languageQueries';
import { styles } from './styles';

export default function LanguageView({ navigation }) {
  const { t } = useTranslation();
  const { language } = useLanguageQuery();
  const setLanguage = useSetLanguageMutation();

  return (
    <ScreenLayout center={false}>
      <BackButton label={t('common.back.settings')} onPress={() => navigation.goBack()} />
      <ScreenHeader headline={t('settings.language.headline')} sub={t('settings.language.sub')} />
      <View style={styles.languageGrid}>
        {LANGUAGES.map((lang) => (
          <LanguageOption
            key={lang.code}
            native={lang.native}
            label={lang.label}
            rtl={lang.rtl}
            selected={language === lang.code}
            selectedText={t('common.selected')}
            onPress={() => setLanguage.mutate(lang.code, { onSuccess: () => navigation.goBack() })}
          />
        ))}
      </View>
    </ScreenLayout>
  );
}
