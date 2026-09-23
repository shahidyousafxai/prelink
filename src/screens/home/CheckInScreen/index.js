import { useState } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import OptionButton from '../../../components/OptionButton';
import ConfirmCheck from '../../../components/shared/ConfirmCheck';
import { styles } from './styles';

// Deliberately almost no chrome — this is the atomic unit the whole
// Micro-Commitment Flywheel depends on. Auto-returns to Today shortly after
// logging, with no forced follow-up questions.
export default function CheckInScreen({ navigation }) {
  const { t } = useTranslation();
  const [done, setDone] = useState(false);
  const options = t('home.checkIn.options', { returnObjects: true });

  const logMood = () => {
    setDone(true);
    setTimeout(() => navigation.navigate('Main', { screen: 'Today' }), 1300);
  };

  if (done) {
    return (
      <ScreenLayout>
        <ConfirmCheck />
        <Text style={styles.doneTitle}>{t('home.checkIn.doneTitle')}</Text>
        <Text style={styles.doneSub}>{t('home.checkIn.doneSub')}</Text>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <Text style={styles.headline}>{t('home.checkIn.headline')}</Text>
      <Text style={styles.sub}>{t('home.checkIn.sub')}</Text>
      <View style={styles.options}>
        {options.map((option) => (
          <OptionButton key={option} label={option} onPress={logMood} />
        ))}
      </View>
    </ScreenLayout>
  );
}
