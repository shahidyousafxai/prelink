import { View, Text } from 'react-native';

import ScreenLayout from '../../../components/ScreenLayout';
import BackButton from '../../../components/BackButton';
import PrimaryButton from '../../../components/PrimaryButton';
import { styles } from './styles';

// A deliberately unglamorous gate — clinicians don't casually browse into
// this, they sign in through credentialed, logged access. Reached via
// Settings → Preview: Clinician portal (this app doesn't implement a real
// separate clinician login).
export default function ClinicianGateScreen({ navigation }) {
  return (
    <ScreenLayout center={false}>
      <BackButton label="Settings" onPress={() => navigation.navigate('Main', { screen: 'You' })} />
      <View style={styles.centerFlow}>
        <Text style={styles.eyebrow}>Clinician portal</Text>
        <Text style={styles.headline}>Organizational sign-in required</Text>
        <Text style={styles.sub}>
          Access is credentialed and consent-gated. Every entry is logged with timestamp and reason.
        </Text>
        <PrimaryButton label="Enter portal (demo)" onPress={() => navigation.navigate('ClinicianQueue')} />
      </View>
    </ScreenLayout>
  );
}
