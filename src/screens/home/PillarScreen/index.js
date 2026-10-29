import { View, Text, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import Card from '../../../components/shared/Card';
import LockRibbon from '../../../components/LockRibbon';
import NeutralCard from '../../../components/NeutralCard';
import SectionLabel from '../../../components/shared/SectionLabel';
import ListRow from '../../../components/shared/ListRow';
import { colors } from '../../../theme/theme';
import { styles } from './styles';

const MIND_ICON = 'bulb-outline';
const MIND_ACCENT = colors.pine;
const MIND_TINT = colors.pineSoft;

// Mind is the only pillar with real engagement content, and the only one
// that still uses this screen — Heart/Weight are their own honest "not
// available" screens, and Calm is its own real screen, both registered
// separately. Client requirement (Scene 5a): "No numerical threshold or
// confirmed clinical lead is supplied. Do not invent one... disable
// interpretation for real users until reviewed and validated." The trend
// line and "holding steady" badge this used to show are gone — only the
// judgment about what the data means is locked, the task itself still
// works.
const ACTIVITY_ICONS = ['cafe-outline', 'call-outline'];

export default function PillarScreen({ navigation }) {
  const { t } = useTranslation();
  const activities = t('home.pillar.mind.activities', { returnObjects: true });

  const accentEdge = I18nManager.isRTL
    ? { borderRightWidth: 4, borderRightColor: MIND_ACCENT }
    : { borderLeftWidth: 4, borderLeftColor: MIND_ACCENT };

  return (
    <ScreenLayout center={false} tabBarInset>
      <BackButton label={t('common.back.today')} onPress={() => navigation.navigate('Today')} />
      <LockRibbon label={t('home.pillar.mind.lockRibbon')} />

      <View style={[styles.avatar, { backgroundColor: MIND_ACCENT }]}>
        <Ionicons name={MIND_ICON} size={22} color={colors.white} />
      </View>
      <ScreenHeader headline={t('home.pillar.mind.name')} sub={t('home.pillar.mind.sub')} />

      <NeutralCard>{t('home.pillar.mind.neutralMessage')}</NeutralCard>

      <SectionLabel style={styles.sectionSpacing}>{t('home.pillar.todayOption')}</SectionLabel>
      <Card
        style={[styles.taskCard, { backgroundColor: MIND_TINT, borderColor: 'transparent' }, accentEdge]}
        onPress={() => navigation.navigate('AssessmentTask')}
      >
        <View style={[styles.taskAvatar, { backgroundColor: MIND_ACCENT }]}>
          <Ionicons name="sparkles-outline" size={18} color={colors.white} />
        </View>
        <View style={styles.taskText}>
          <Text style={styles.taskTitle}>{t('home.pillar.mind.taskTitle')}</Text>
          <Text style={styles.taskBody}>{t('home.pillar.mind.taskBody')}</Text>
        </View>
        <Ionicons
          name={I18nManager.isRTL ? 'chevron-back' : 'chevron-forward'}
          size={18}
          color={colors.inkSoft}
        />
      </Card>

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
    </ScreenLayout>
  );
}
