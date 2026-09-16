import { Text } from 'react-native';

import ScreenLayout from '../../../components/ScreenLayout';
import ScreenHeader from '../../../components/ScreenHeader';
import BackButton from '../../../components/BackButton';
import Card from '../../../components/Card';
import TrendLine from '../../../components/TrendLine';
import SectionLabel from '../../../components/SectionLabel';
import ListRow from '../../../components/ListRow';
import { styles } from './styles';

const TREND_PATH = 'M0,40 C40,35 60,20 100,25 C140,30 160,15 200,18 C230,20 250,22 280,15';

// Template for all four pillars (only Mind is wired through for now). The
// trend line is intentionally unlabeled — direction only, no axis, no
// numbers — per the "no raw scores in UX" rule.
export default function PillarMindScreen({ navigation }) {
  return (
    <ScreenLayout center={false}>
      <BackButton label="Today" onPress={() => navigation.navigate('Today')} />
      <ScreenHeader
        eyebrow="My Health · Mind"
        headline="Mind"
        sub="Directional patterns only — no scores, no numbers to interpret."
      />

      <Card style={styles.card}>
        <TrendLine path={TREND_PATH} label="Holding steady over the last 6 weeks" />
      </Card>

      <SectionLabel>Today's option</SectionLabel>
      <Card style={styles.card}>
        <Text style={styles.taskTitle}>5-minute word recall</Text>
        <Text style={styles.taskBody}>
          Some people find this a nice way to start the afternoon. Entirely optional — tap to try it.
        </Text>
      </Card>

      <SectionLabel>What's been working for you</SectionLabel>
      <Card>
        <ListRow label="Morning tea + puzzle" tag="3 days" />
        <ListRow label="Calling a family member" tag="this week" last />
      </Card>
    </ScreenLayout>
  );
}
