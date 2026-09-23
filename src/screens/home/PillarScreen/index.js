import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

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

// Only Mind has real engagement content — Heart/Weight/Calm are explicit
// placeholders, per the prototype's own "NOT YET BUILT — SAME TEMPLATE AS
// MIND" ribbon. Same layout for all four; only the data below differs.
// Non-translatable, purely visual fields (SVG path, trend color, "future"
// flag) stay here; all copy is looked up from i18n by pillar key.
const PILLAR_META = {
  mind: {
    trendPath: 'M0,40 C40,35 60,20 100,25 C140,30 160,15 200,18 C230,20 250,22 280,15',
    trendColor: colors.pine,
    watch: false,
  },
  heart: {
    future: true,
    trendPath: 'M0,30 C60,28 100,20 160,25 C210,28 240,20 280,22',
    trendColor: colors.pine,
    watch: false,
  },
  weight: {
    future: true,
    trendPath: 'M0,25 C60,27 100,30 160,28 C210,26 240,24 280,20',
    trendColor: colors.pine,
    watch: false,
  },
  calm: {
    future: true,
    trendPath: 'M0,20 C60,30 100,40 160,35 C210,32 240,38 280,42',
    trendColor: colors.clay,
    watch: true,
  },
};

export default function PillarScreen({ navigation, route }) {
  const { t } = useTranslation();
  const pillarKey = route.params?.pillar ?? 'mind';
  const meta = PILLAR_META[pillarKey];
  const isMind = pillarKey === 'mind';

  const name = t(`home.pillar.${pillarKey}.name`);
  const sub = meta.future ? t('home.pillar.placeholderSub') : t(`home.pillar.${pillarKey}.sub`);
  const trendLabel = meta.watch ? t('home.pillar.trendLabelWatch') : t('home.pillar.trendLabelSteady');
  const activities = isMind ? t('home.pillar.mind.activities', { returnObjects: true }) : null;

  return (
    <ScreenLayout center={false}>
      <BackButton label={t('common.back.today')} onPress={() => navigation.navigate('Today')} />
      {meta.future && <FutureRibbon label={t('home.pillar.ribbon')} />}
      <ScreenHeader eyebrow={t('home.pillar.eyebrow', { name })} headline={name} sub={sub} />

      <Card style={styles.card}>
        <TrendLine path={meta.trendPath} color={meta.trendColor} label={trendLabel} />
      </Card>

      <SectionLabel>{meta.future ? t('home.pillar.todayOptionPlaceholder') : t('home.pillar.todayOption')}</SectionLabel>
      <Card
        style={activities ? styles.card : null}
        onPress={isMind ? () => navigation.navigate('AssessmentTask') : undefined}
      >
        <Text style={styles.taskTitle}>{t(`home.pillar.${pillarKey}.taskTitle`)}</Text>
        <Text style={styles.taskBody}>{t(`home.pillar.${pillarKey}.taskBody`)}</Text>
      </Card>

      {activities && (
        <>
          <SectionLabel>{t('home.pillar.workingForYou')}</SectionLabel>
          <Card>
            {activities.map((activity, index) => (
              <ListRow
                key={activity.label}
                label={activity.label}
                tag={activity.tag}
                last={index === activities.length - 1}
              />
            ))}
          </Card>
        </>
      )}
    </ScreenLayout>
  );
}
