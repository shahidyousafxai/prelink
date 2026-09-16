import { View } from 'react-native';

import ScreenHeader from '../../../components/ScreenHeader';
import BackButton from '../../../components/BackButton';
import LanguageOption from '../../../components/LanguageOption';
import { styles } from './styles';

const LANGUAGES = [
  { code: 'en', native: 'English', label: 'English' },
  { code: 'ar', native: 'العربية', label: 'Arabic', rtl: true },
  { code: 'fr', native: 'Français', label: 'French' },
  { code: 'ur', native: 'اردو', label: 'Urdu', rtl: true },
];

export default function LanguageView({ selected, onSelect, onBack }) {
  return (
    <>
      <BackButton label="Settings" onPress={onBack} />
      <ScreenHeader headline="Language" sub="Choose the language you're most comfortable with." />
      <View style={styles.languageGrid}>
        {LANGUAGES.map((lang) => (
          <LanguageOption
            key={lang.code}
            native={lang.native}
            label={lang.label}
            rtl={lang.rtl}
            selected={selected === lang.code}
            onPress={() => onSelect(lang.code)}
          />
        ))}
      </View>
    </>
  );
}
