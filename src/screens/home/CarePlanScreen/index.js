import { Text } from 'react-native';

import ScreenLayout from '../../../components/ScreenLayout';
import ScreenHeader from '../../../components/ScreenHeader';
import Card from '../../../components/Card';
import SecondaryButton from '../../../components/SecondaryButton';
import { styles } from './styles';

// Every suggestion follows the same three-step structure: normalize, offer
// a choice, then the lowest-effort option — never "should"/"recommended".
export default function CarePlanScreen() {
  return (
    <ScreenLayout center={false}>
      <ScreenHeader
        eyebrow="Care Plan"
        headline="A few optional ideas"
        sub="Normalize, then offer a choice, then the lowest-effort option — nothing here is an instruction."
      />

      <Card style={styles.card}>
        <Text style={styles.title}>Some people find a short walk helps midday.</Text>
        <Text style={styles.body}>If you'd like, here's a 20-second option instead.</Text>
        <SecondaryButton label="Try the 20-second option" />
      </Card>

      <Card>
        <Text style={styles.title}>Staying connected tends to help too.</Text>
        <Text style={styles.bodyLast}>
          A quick call with family, whenever feels right — no reminder will chase you about it.
        </Text>
      </Card>
    </ScreenLayout>
  );
}
