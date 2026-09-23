import { useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import Chip from '../../../components/shared/Chip';
import PillarChip from '../../../components/PillarChip';
import TextLink from '../../../components/shared/TextLink';
import { colors } from '../../../theme/theme';
import { getGreeting } from '../../../utils/greeting';
import { getLanguageMeta } from '../../../i18n/languages';
import { styles } from './styles';

const MOODS = ['Foggy', 'Okay', 'Good', 'Light'];
const PILLARS = ['heart', 'weight', 'calm', 'mind'];

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
    <ScreenLayout center={false}>
      <View style={styles.headerRow}>
        <Text style={styles.greet}>{reentryPreview ? t('home.home.welcomeBack') : getGreeting(t)}</Text>
        <Text style={styles.greetSub}>
          {reentryPreview ? t('home.home.reentrySub') : t('home.home.weekdaySub', { weekday })}
        </Text>
      </View>

      <View style={styles.moodRow}>
        {MOODS.map((m) => (
          <Chip
            key={m}
            label={t(`home.home.moods.${m}`)}
            variant="tile"
            selected={mood === m}
            onPress={() => setMood(m)}
          />
        ))}
      </View>

      <LinearGradient
        colors={[colors.pine, '#183931']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.6, y: 1 }}
        style={styles.heroCard}
      >
        <Text style={styles.heroEyebrow}>{t('home.home.heroEyebrow')}</Text>
        <Text style={styles.heroTitle}>{hero.title}</Text>
        <Text style={styles.heroBody}>{hero.body}</Text>
        <Pressable style={styles.heroButton} onPress={() => navigation.navigate('CheckIn')}>
          <Text style={styles.heroButtonText}>{t('home.home.heroButton')}</Text>
        </Pressable>
      </LinearGradient>

      <View style={styles.pillars}>
        {PILLARS.map((key) => (
          <PillarChip
            key={key}
            name={t(`home.home.pillars.${key}`)}
            state={t(`home.home.pillarStates.${key === 'calm' ? 'worthLook' : 'holdingSteady'}`)}
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
