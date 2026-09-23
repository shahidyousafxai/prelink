import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import LanguageOption from '../../../components/LanguageOption';
import { LANGUAGES } from '../../../i18n/languages';
import { useSetLanguageMutation } from '../../../network/language/languageQueries';
import { styles } from './styles';

export default function LanguageView({ selected, onSelect, onBack }) {
  const { t } = useTranslation();
  const setLanguage = useSetLanguageMutation();

  return (
    <>
      <BackButton label={t('common.back.settings')} onPress={onBack} />
      <ScreenHeader headline={t('settings.language.headline')} sub={t('settings.language.sub')} />
      <View style={styles.languageGrid}>
        {LANGUAGES.map((lang) => (
          <LanguageOption
            key={lang.code}
            native={lang.native}
            label={lang.label}
            rtl={lang.rtl}
            selected={selected === lang.code}
            selectedText={t('common.selected')}
            onPress={() => setLanguage.mutate(lang.code, { onSuccess: () => onSelect(lang.code) })}
          />
        ))}
      </View>
    </>
  );
}
