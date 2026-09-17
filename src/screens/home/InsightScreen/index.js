import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ScreenLayout from '../../../components/ScreenLayout';
import SectionLabel from '../../../components/SectionLabel';
import SecondaryButton from '../../../components/SecondaryButton';
import TextLink from '../../../components/TextLink';
import { styles } from './styles';

// The highest-regulatory-risk screen in the app: no score, no chart, no
// disease name, ever. Escalation is user-initiated and optional — the app
// never pushes it.
export default function InsightScreen({ navigation }) {
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

      {/* Talking to the care team leads into Stage 4 consent + escalation —
          not built yet, so this is visually present but inert for now. */}
      <SecondaryButton label="Talk to your care team, if you'd like" />
      <TextLink
        label="Not now"
        variant="muted"
        onPress={() => navigation.navigate('Main', { screen: 'Today' })}
      />
    </ScreenLayout>
  );
}
