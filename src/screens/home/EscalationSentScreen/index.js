import { Text } from 'react-native';

import ScreenLayout from '../../../components/ScreenLayout';
import ConfirmCheck from '../../../components/ConfirmCheck';
import PrimaryButton from '../../../components/PrimaryButton';
import { styles } from './styles';

// Confirms the handoff without implying urgency or a verdict. From here the
// case sits in a clinician's queue, not an algorithm's.
export default function EscalationSentScreen({ navigation }) {
  return (
    <ScreenLayout>
      <ConfirmCheck />
      <Text style={styles.headline}>Your care team has been notified</Text>
      <Text style={styles.sub}>
        A licensed clinician will review your recent patterns. You'll hear back through PreLink — nothing
        urgent is implied.
      </Text>
      <PrimaryButton label="Done" onPress={() => navigation.navigate('Main', { screen: 'Today' })} />
    </ScreenLayout>
  );
}
