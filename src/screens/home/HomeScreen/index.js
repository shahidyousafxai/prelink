import { useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import Chip from '../../../components/shared/Chip';
import PillarChip from '../../../components/PillarChip';
import AnimatedPressable from '../../../components/shared/AnimatedPressable';
import TextLink from '../../../components/shared/TextLink';
import { colors } from '../../../theme/theme';
import { getGreeting } from '../../../utils/greeting';
import { getLanguageMeta } from '../../../i18n/languages';
import { styles } from './styles';

const MOODS = [
  { key: 'Foggy', icon: 'cloud-outline' },
  { key: 'Okay', icon: 'partly-sunny-outline' },
  { key: 'Good', icon: 'sunny-outline' },
  { key: 'Light', icon: 'sparkles-outline' },
];

const PILLARS = [
  { key: 'heart', icon: 'heart-outline', accent: colors.clay },
  { key: 'weight', icon: 'barbell-outline', accent: colors.gold },
  { key: 'calm', icon: 'leaf-outline', accent: colors.ink },
  { key: 'mind', icon: 'bulb-outline', accent: colors.pine },
];

// Matches the prototype's Home (Today) screen. The mood row and the
// "returning after time away" preview both live-update the hero card, per
// Capacity-Adaptive Design and Failure-Resilient Re-Entry.
export default function HomeScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [mood, setMood] = useState('Okay');
  const [reentryPreview, setReentryPreview] = useState(false);

  const weekday = useMemo(() => {
    const { locale } = getLanguageMeta(i18n.language);
    return new Date().toLocaleDateString(locale, { weekday: 'long' });
  }, [i18n.language]);

  const hero = reentryPreview
    ? { title: t('home.home.reentryHero.title'), body: t('home.home.reentryHero.body') }
    : { title: t(`home.home.moodHero.${mood}.title`), body: t(`home.home.moodHero.${mood}.body`) };

  return (
    <ScreenLayout center={false} tabBarInset>
      <View style={styles.headerRow}>
        <Text style={styles.greet}>{reentryPreview ? t('home.home.welcomeBack') : getGreeting(t)}</Text>
        <Text style={styles.greetSub}>
          {reentryPreview ? t('home.home.reentrySub') : t('home.home.weekdaySub', { weekday })}
        </Text>
      </View>

      <View style={styles.moodRow}>
        {MOODS.map(({ key, icon }) => (
          <Chip
            key={key}
            label={t(`home.home.moods.${key}`)}
            icon={icon}
            variant="tile"
            selected={mood === key}
            onPress={() => setMood(key)}
          />
        ))}
      </View>

      <LinearGradient
        colors={[colors.pine, '#183931']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.6, y: 1 }}
        style={styles.heroCard}
      >
        <Text style={styles.heroTitle}>{hero.title}</Text>
        <Text style={styles.heroBody}>{hero.body}</Text>
        <AnimatedPressable style={styles.heroButton} onPress={() => navigation.navigate('CheckIn')} scaleTo={0.96}>
          <Text style={styles.heroButtonText}>{t('home.home.heroButton')}</Text>
          <Ionicons name="arrow-forward" size={15} color={colors.pine} />
        </AnimatedPressable>
      </LinearGradient>

      <View style={styles.pillars}>
        {PILLARS.map(({ key, icon, accent }) => (
          <PillarChip
            key={key}
            name={t(`home.home.pillars.${key}`)}
            state={t(`home.home.pillarStates.${key === 'calm' ? 'worthLook' : 'holdingSteady'}`)}
            icon={icon}
            accent={accent}
            watch={key === 'calm'}
            onPress={() => navigation.navigate('MyHealth', { pillar: key })}
          />
        ))}
      </View>

      <TextLink
        label={t('home.home.reentryPreviewLink')}
        variant="muted"
        onPress={() => setReentryPreview((value) => !value)}
      />
    </ScreenLayout>
  );
}
