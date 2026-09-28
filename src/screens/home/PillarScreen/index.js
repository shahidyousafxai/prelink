import { View, Text, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
// `icon`/`accent` match Home's pillar grid tiles, so tapping a tile carries
// its identity into this detail screen instead of landing on a plain page.
// Non-translatable, purely visual fields stay here; all copy is looked up
// from i18n by pillar key.
const PILLAR_META = {
  mind: {
    icon: 'bulb-outline',
    accent: colors.pine,
    tint: colors.pineSoft,
    trendPath: 'M0,40 C40,35 60,20 100,25 C140,30 160,15 200,18 C230,20 250,22 280,15',
    trendColor: colors.pine,
    watch: false,
  },
  heart: {
    icon: 'heart-outline',
    accent: colors.clay,
    tint: colors.claySoft,
    future: true,
    trendPath: 'M0,30 C60,28 100,20 160,25 C210,28 240,20 280,22',
    trendColor: colors.pine,
    watch: false,
  },
  weight: {
    icon: 'barbell-outline',
    accent: colors.gold,
    tint: colors.goldSoft,
    future: true,
    trendPath: 'M0,25 C60,27 100,30 160,28 C210,26 240,24 280,20',
    trendColor: colors.pine,
    watch: false,
  },
  calm: {
    icon: 'leaf-outline',
    accent: colors.ink,
    tint: colors.sandDeep,
    future: true,
    trendPath: 'M0,20 C60,30 100,40 160,35 C210,32 240,38 280,42',
    trendColor: colors.clay,
    watch: true,
  },
};

// Matches the fixed order of home.pillar.mind.activities: tea+puzzle first,
// calling a family member second.
const ACTIVITY_ICONS = ['cafe-outline', 'call-outline'];

export default function PillarScreen({ navigation, route }) {
  const { t } = useTranslation();
  const pillarKey = route.params?.pillar ?? 'mind';
  const meta = PILLAR_META[pillarKey];
  const isMind = pillarKey === 'mind';

  const name = t(`home.pillar.${pillarKey}.name`);
  const sub = meta.future ? t('home.pillar.placeholderSub') : t(`home.pillar.${pillarKey}.sub`);
  const trendLabel = meta.watch ? t('home.pillar.trendLabelWatch') : t('home.pillar.trendLabelSteady');
  const activities = isMind ? t('home.pillar.mind.activities', { returnObjects: true }) : null;

  // Only the task card gets the tinted background + colored leading-edge
  // accent (flipped to the trailing edge in RTL) — it's the one you can tap,
  // so it's the one that stands out. Trend and activities stay plain white.
  const tintStyle = { backgroundColor: meta.tint, borderColor: 'transparent' };
  const accentEdge = I18nManager.isRTL
    ? { borderRightWidth: 4, borderRightColor: meta.accent }
    : { borderLeftWidth: 4, borderLeftColor: meta.accent };

  return (
    <ScreenLayout center={false} tabBarInset>
      <BackButton label={t('common.back.today')} onPress={() => navigation.navigate('Today')} />
      {meta.future && <FutureRibbon label={t('home.pillar.ribbon')} />}

      <View style={[styles.avatar, { backgroundColor: meta.accent }]}>
        <Ionicons name={meta.icon} size={22} color={colors.white} />
      </View>
      <ScreenHeader headline={name} sub={sub} />

      <Card style={styles.card}>
        <TrendLine path={meta.trendPath} color={meta.trendColor} label={trendLabel} />
      </Card>

      <SectionLabel>{meta.future ? t('home.pillar.todayOptionPlaceholder') : t('home.pillar.todayOption')}</SectionLabel>
      <Card
        style={[styles.taskCard, tintStyle, accentEdge, activities && styles.card]}
        onPress={isMind ? () => navigation.navigate('AssessmentTask') : undefined}
      >
        <View style={[styles.taskAvatar, { backgroundColor: meta.accent }]}>
          <Ionicons name={isMind ? 'sparkles-outline' : meta.icon} size={18} color={colors.white} />
        </View>
        <View style={styles.taskText}>
          <Text style={styles.taskTitle}>{t(`home.pillar.${pillarKey}.taskTitle`)}</Text>
          <Text style={styles.taskBody}>{t(`home.pillar.${pillarKey}.taskBody`)}</Text>
        </View>
        {isMind && (
          <Ionicons
            name={I18nManager.isRTL ? 'chevron-back' : 'chevron-forward'}
            size={18}
            color={colors.inkSoft}
          />
        )}
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
                icon={ACTIVITY_ICONS[index]}
                last={index === activities.length - 1}
              />
            ))}
          </Card>
        </>
      )}
    </ScreenLayout>
  );
}
