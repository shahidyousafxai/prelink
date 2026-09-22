import { useState } from 'react';
import { View, Text } from 'react-native';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import BackButton from '../../../components/shared/BackButton';
import Chip from '../../../components/shared/Chip';
import ConfirmCheck from '../../../components/shared/ConfirmCheck';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import { useConsentQuery } from '../../../network/consent/consentQueries';
import { styles } from './styles';

const WORDS = ['Garden', 'Lantern', 'River', 'Basket'];

// A placeholder for the actual sandbox task — the real content is
// proprietary vendor IP. Completion is outcome-agnostic and never reveals
// whether an answer was "correct".
export default function AssessmentTaskScreen({ navigation }) {
  const { data: consent } = useConsentQuery();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    navigation.navigate(consent?.s2 ? 'Insight' : 'Consent2');
  };

  return (
    <ScreenLayout center={false}>
      <BackButton label="Back to Mind" onPress={() => navigation.navigate('Main', { screen: 'MyHealth' })} />
      <Text style={styles.progress}>STEP 2 OF 4</Text>

      <View style={styles.centerFlow}>
        {selected ? (
          <>
            <ConfirmCheck />
            <Text style={styles.doneTitle}>Nicely done</Text>
            <Text style={styles.doneSub}>Results are reviewed gently — never shown as a raw score.</Text>
            <PrimaryButton label="Continue" onPress={handleContinue} />
          </>
        ) : (
          <>
            <Text style={styles.headline}>Which word did you see a moment ago?</Text>
            <Text style={styles.sub}>No right or wrong pace — take your time.</Text>
            <View style={styles.wordGrid}>
              {WORDS.map((word) => (
                <Chip key={word} label={word} variant="grid" onPress={() => setSelected(word)} />
              ))}
            </View>
          </>
        )}
      </View>
    </ScreenLayout>
  );
}
