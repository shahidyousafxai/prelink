import { useState } from 'react';
import { View } from 'react-native';

import ScreenLayout from '../../../components/ScreenLayout';
import ScreenHeader from '../../../components/ScreenHeader';
import AuthMark from '../../../components/AuthMark';
import LanguageOption from '../../../components/LanguageOption';
import PrimaryButton from '../../../components/PrimaryButton';
import { styles } from './styles';

const LANGUAGES = [
  { code: 'en', native: 'English', label: 'English' },
  { code: 'ar', native: 'العربية', label: 'Arabic', rtl: true },
  { code: 'fr', native: 'Français', label: 'French' },
  { code: 'ur', native: 'اردو', label: 'Urdu', rtl: true },
];

export default function LanguageScreen({ navigation }) {
  const [selected, setSelected] = useState('en');

  return (
    <ScreenLayout center={false}>
      <AuthMark />
      <ScreenHeader
        headline="Welcome to PreLink"
        sub="A calmer way to look after your wellbeing. Choose the language you're most comfortable with."
      />

      <View style={styles.grid}>
        {LANGUAGES.map((lang) => (
          <LanguageOption
            key={lang.code}
            native={lang.native}
            label={lang.label}
            rtl={lang.rtl}
            selected={selected === lang.code}
            onPress={() => setSelected(lang.code)}
          />
        ))}
      </View>

      <View style={styles.spacer} />

      <PrimaryButton label="Continue" onPress={() => navigation.navigate('OnboardingConsent')} />
    </ScreenLayout>
  );
}
