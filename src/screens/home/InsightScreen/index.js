import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import SectionLabel from '../../../components/shared/SectionLabel';
import SecondaryButton from '../../../components/shared/SecondaryButton';
import TextLink from '../../../components/shared/TextLink';
import { useConsentQuery } from '../../../network/consent/consentQueries';
import { styles } from './styles';

// The highest-regulatory-risk screen in the app: no score, no chart, no
// disease name, ever. Escalation is user-initiated and optional — the app
// never pushes it.
export default function InsightScreen({ navigation }) {
  const { data: consent } = useConsentQuery();

  const handleEscalate = () => {
    navigation.navigate(consent?.s4 ? 'EscalationSent' : 'Consent4');
  };

  return (
    <ScreenLayout center={false}>
      <View style={styles.icon}>
        <Ionicons name="contrast-outline" size={20} color="#7A5A1E" />
      </View>
      <Text style={styles.headline}>A gentle note</Text>
      <View style={styles.body}>
        <Text style={styles.bodyText}>
          We noticed a small change in how your days have been feeling lately. This is common, and often
          modifiable.
        </Text>
      </View>

      <SectionLabel>Here's what helps people most at this stage</SectionLabel>
      <View style={styles.helpsCard}>
        <Text style={styles.helpsTitle}>Small, steady routines</Text>
        <Text style={styles.helpsBody}>
          A short daily check-in and staying connected with family tend to help the most — no major changes
          needed.
        </Text>
      </View>

      <SecondaryButton label="Talk to your care team, if you'd like" onPress={handleEscalate} />
      <TextLink
        label="Not now"
        variant="muted"
        onPress={() => navigation.navigate('Main', { screen: 'Today' })}
      />
    </ScreenLayout>
  );
}
