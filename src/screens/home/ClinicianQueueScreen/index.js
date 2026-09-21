import { Text } from 'react-native';

import ScreenLayout from '../../../components/ScreenLayout';
import ScreenHeader from '../../../components/ScreenHeader';
import BackButton from '../../../components/BackButton';
import Banner from '../../../components/Banner';
import FlagRow from '../../../components/FlagRow';
import { useConsentQuery } from '../../../network/consent/consentQueries';
import { styles } from './styles';

// Mona only appears here, flagged, after Stage 4 consent was actually
// granted on the patient side — this list reflects the shared consent
// state, it isn't hardcoded.
export default function ClinicianQueueScreen({ navigation }) {
  const { data: consent } = useConsentQuery();

  return (
    <ScreenLayout center={false}>
      <BackButton label="Settings" onPress={() => navigation.navigate('Main', { screen: 'You' })} />
      <ScreenHeader eyebrow="Clinician portal · gated access" headline="Your review queue" />
      <Banner variant="governance">Consent-gated view. Every access is logged with timestamp and reason.</Banner>

      {consent?.s4 && (
        <FlagRow
          name="Mona K."
          sub="Just flagged"
          flagLabel="Review"
          flagVariant="gold"
          onPress={() => navigation.navigate('ClinicianCase')}
        />
      )}
      <FlagRow name="Samir H." sub="Checked in daily" flagLabel="Stable" flagVariant="pine" />
      <FlagRow name="Layla A." sub="New — awaiting first sync" flagLabel="Stable" flagVariant="pine" />

      {!consent?.s4 && <Text style={styles.note}>No new escalations right now.</Text>}
    </ScreenLayout>
  );
}
