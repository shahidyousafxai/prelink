import { useState } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import BackButton from '../../../components/shared/BackButton';
import Avatar from '../../../components/shared/Avatar';
import Card from '../../../components/shared/Card';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import ConfirmBanner from '../../../components/shared/ConfirmBanner';
import { useConsentQuery } from '../../../network/consent/consentQueries';
import { colors } from '../../../theme/theme';
import { styles } from './styles';

// A genuinely separate role, not a filtered version of the patient's own
// screens — locked until the Stage 3 caregiver invite is actually sent
// (Settings → Invite a caregiver), which is enforced here, not just
// described. Reached via Settings → Preview: Caregiver view, mirroring the
// prototype's own "Preview controls" role switcher rather than a real,
// separate caregiver login (which this app doesn't implement).
export default function CaregiverHomeScreen({ navigation }) {
  const { data: consent } = useConsentQuery();
  const [encouraged, setEncouraged] = useState(false);

  const backToSettings = () => navigation.navigate('Main', { screen: 'You' });

  if (!consent?.s3) {
    return (
      <ScreenLayout center={false}>
        <BackButton label="Settings" onPress={backToSettings} />
        <View style={styles.centerFlow}>
          <Ionicons name="hourglass-outline" size={30} color={colors.inkSoft} style={styles.lockedIcon} />
          <Text style={styles.lockedTitle}>Waiting on invite acceptance</Text>
          <Text style={styles.lockedSub}>
            This view unlocks once an invite is sent and accepted from Settings → Invite a caregiver.
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout center={false}>
      <BackButton label="Settings" onPress={backToSettings} />
      <Text style={styles.eyebrow}>Viewing as caregiver</Text>
      <View style={styles.header}>
        <Avatar initial="M" />
        <View style={styles.headerText}>
          <Text style={styles.name}>Mona's care circle</Text>
          <Text style={styles.summaryOnly}>Summary view only</Text>
        </View>
      </View>

      <Card style={styles.card}>
        <Text style={styles.cardLabel}>This week</Text>
        <Text style={styles.cardBody}>Mona is holding steady across all areas.</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.cardLabel}>Engagement</Text>
        <Text style={styles.cardBody}>Checked in most days — nothing needed from you right now.</Text>
      </Card>

      {encouraged ? (
        <ConfirmBanner>Sent — Mona will see this next time she opens PreLink.</ConfirmBanner>
      ) : (
        <PrimaryButton label="Send encouragement" onPress={() => setEncouraged(true)} />
      )}

      <Text style={styles.trustNote}>
        Caregivers see stability summaries only — never raw scores, individual answers, or data exports.
      </Text>
    </ScreenLayout>
  );
}
