import { Text } from 'react-native';

import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import Banner from '../../../components/shared/Banner';
import SectionTitle from '../../../components/shared/SectionTitle';
import DataTable from '../../../components/shared/DataTable';
import { styles } from './styles';

const ROWS = [
  { key: 'Cognitive signals', value: 'Abstracted, qualitative only' },
  { key: 'Longitudinal trends', value: 'Directional, not numeric' },
  { key: 'Caregiver views', value: 'Summary states only' },
  { key: 'Clinician views', value: 'Consent-gated' },
];

export default function AboutView({ onBack }) {
  return (
    <>
      <BackButton label="Settings" onPress={onBack} />
      <ScreenHeader headline="About PreLink & your data" />
      <Banner>
        PreLink is a wellness and early-support tool. It is not a diagnostic tool and not a substitute for
        medical advice.
      </Banner>
      <SectionTitle>What we show, and to whom</SectionTitle>
      <DataTable rows={ROWS} />
      <Text style={styles.footnote}>
        You control what is collected, shared, and deleted. Your data is protected, and you can delete it at
        any time.
      </Text>
    </>
  );
}
