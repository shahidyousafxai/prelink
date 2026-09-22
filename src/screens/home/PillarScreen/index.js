import { Text } from 'react-native';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import Card from '../../../components/shared/Card';
import TrendLine from '../../../components/TrendLine';
import SectionLabel from '../../../components/shared/SectionLabel';
import ListRow from '../../../components/shared/ListRow';
import FutureRibbon from '../../../components/FutureRibbon';
import { colors } from '../../../theme/theme';
import { styles } from './styles';

const PLACEHOLDER_SUB =
  'Directional patterns only — no scores, no numbers to interpret. Content below is a placeholder shape, not final copy.';

// Only Mind has real engagement content — Heart/Weight/Calm are explicit
// placeholders, per the prototype's own "NOT YET BUILT — SAME TEMPLATE AS
// MIND" ribbon. Same layout for all four; only the data below differs.
const PILLAR_DATA = {
  mind: {
    name: 'Mind',
    sub: 'Directional patterns only — no scores, no numbers to interpret.',
    trendPath: 'M0,40 C40,35 60,20 100,25 C140,30 160,15 200,18 C230,20 250,22 280,15',
    trendColor: colors.pine,
    trendLabel: 'Holding steady over the last 6 weeks',
    taskTitle: '5-minute word recall',
    taskBody: 'Some people find this a nice way to start the afternoon. Entirely optional — tap to try it.',
    activities: [
      { label: 'Morning tea + puzzle', tag: '3 days' },
      { label: 'Calling a family member', tag: 'this week' },
    ],
  },
  heart: {
    name: 'Heart',
    future: true,
    sub: PLACEHOLDER_SUB,
    trendPath: 'M0,30 C60,28 100,20 160,25 C210,28 240,20 280,22',
    trendColor: colors.pine,
    trendLabel: 'Holding steady over the last 6 weeks',
    taskTitle: 'Blood pressure check-in',
    taskBody: "Same optional, non-directive pattern as Mind's word-recall task — content TBD.",
  },
  weight: {
    name: 'Weight',
    future: true,
    sub: PLACEHOLDER_SUB,
    trendPath: 'M0,25 C60,27 100,30 160,28 C210,26 240,24 280,20',
    trendColor: colors.pine,
    trendLabel: 'Holding steady over the last 6 weeks',
    taskTitle: 'Culturally-adapted meal log',
    taskBody: "Same optional, non-directive pattern as Mind's task — content TBD.",
  },
  calm: {
    name: 'Calm',
    future: true,
    sub: PLACEHOLDER_SUB,
    trendPath: 'M0,20 C60,30 100,40 160,35 C210,32 240,38 280,42',
    trendColor: colors.clay,
    trendLabel: 'Worth a look this month',
    taskTitle: 'Guided breathing, 3 minutes',
    taskBody: "Same optional, non-directive pattern as Mind's task — content TBD.",
  },
};

export default function PillarScreen({ navigation, route }) {
  const pillarKey = route.params?.pillar ?? 'mind';
  const pillar = PILLAR_DATA[pillarKey];
  const isMind = pillarKey === 'mind';

  return (
    <ScreenLayout center={false}>
      <BackButton label="Today" onPress={() => navigation.navigate('Today')} />
      {pillar.future && <FutureRibbon label="NOT YET BUILT — SAME TEMPLATE AS MIND" />}
      <ScreenHeader eyebrow={`My Health · ${pillar.name}`} headline={pillar.name} sub={pillar.sub} />

      <Card style={styles.card}>
        <TrendLine path={pillar.trendPath} color={pillar.trendColor} label={pillar.trendLabel} />
      </Card>

      <SectionLabel>{pillar.future ? "Today's option (placeholder)" : "Today's option"}</SectionLabel>
      <Card
        style={pillar.activities ? styles.card : null}
        onPress={isMind ? () => navigation.navigate('AssessmentTask') : undefined}
      >
        <Text style={styles.taskTitle}>{pillar.taskTitle}</Text>
        <Text style={styles.taskBody}>{pillar.taskBody}</Text>
      </Card>

      {pillar.activities && (
        <>
          <SectionLabel>What's been working for you</SectionLabel>
          <Card>
            {pillar.activities.map((activity, index) => (
              <ListRow
                key={activity.label}
                label={activity.label}
                tag={activity.tag}
                last={index === pillar.activities.length - 1}
              />
            ))}
          </Card>
        </>
      )}
    </ScreenLayout>
  );
}
