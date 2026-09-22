import { useState } from 'react';
import { View, Text } from 'react-native';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import OptionButton from '../../../components/OptionButton';
import ConfirmCheck from '../../../components/shared/ConfirmCheck';
import { styles } from './styles';

const OPTIONS = ['Clear', 'A little foggy', 'Very foggy'];

// Deliberately almost no chrome — this is the atomic unit the whole
// Micro-Commitment Flywheel depends on. Auto-returns to Today shortly after
// logging, with no forced follow-up questions.
export default function CheckInScreen({ navigation }) {
  const [done, setDone] = useState(false);

  const logMood = () => {
    setDone(true);
    setTimeout(() => navigation.navigate('Main', { screen: 'Today' }), 1300);
  };

  if (done) {
    return (
      <ScreenLayout>
        <ConfirmCheck />
        <Text style={styles.doneTitle}>Logged — thank you</Text>
        <Text style={styles.doneSub}>Taking you back to Today…</Text>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <Text style={styles.headline}>How foggy does today feel?</Text>
      <Text style={styles.sub}>Takes about 15 seconds. Skip anytime.</Text>
      <View style={styles.options}>
        {OPTIONS.map((option) => (
          <OptionButton key={option} label={option} onPress={logMood} />
        ))}
      </View>
    </ScreenLayout>
  );
}
