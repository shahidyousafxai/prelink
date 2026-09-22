import { useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import Chip from '../../../components/shared/Chip';
import PillarChip from '../../../components/PillarChip';
import TextLink from '../../../components/shared/TextLink';
import { colors } from '../../../theme/theme';
import { getGreeting } from '../../../utils/greeting';
import { styles } from './styles';

const MOODS = ['Foggy', 'Okay', 'Good', 'Light'];

const MOOD_HERO_COPY = {
  Foggy: {
    title: "One tap, that's it today",
    body: "Low-key day noted. Here's the smallest possible win — no pressure for more.",
  },
  Okay: {
    title: 'A steady, easy step',
    body: 'A simple daily option, take it at whatever pace suits you.',
  },
  Good: {
    title: 'Feeling up for a bit more?',
    body: "Good energy today. Here's a slightly fuller option, still optional.",
  },
  Light: {
    title: 'Feeling up for a bit more?',
    body: "Good energy today. Here's a slightly fuller option, still optional.",
  },
};

const REENTRY_HERO_COPY = {
  title: "Today's step takes 20 seconds",
  body: 'No missed days, no catching up needed. Just today.',
};

// Matches the prototype's Home (Today) screen. The mood row and the
// "returning after time away" preview both live-update the hero card, per
// Capacity-Adaptive Design and Failure-Resilient Re-Entry.
export default function HomeScreen({ navigation }) {
  const [mood, setMood] = useState('Okay');
  const [reentryPreview, setReentryPreview] = useState(false);

  const weekday = useMemo(() => new Date().toLocaleDateString('en-US', { weekday: 'long' }), []);
  const hero = reentryPreview ? REENTRY_HERO_COPY : MOOD_HERO_COPY[mood];

  return (
    <ScreenLayout center={false}>
      <View style={styles.headerRow}>
        <Text style={styles.greet}>{reentryPreview ? 'Welcome back' : getGreeting()}</Text>
        <Text style={styles.greetSub}>
          {reentryPreview ? 'Life happens. We saved your place.' : `${weekday} · your place is saved`}
        </Text>
      </View>

      <View style={styles.moodRow}>
        {MOODS.map((m) => (
          <Chip key={m} label={m} variant="tile" selected={mood === m} onPress={() => setMood(m)} />
        ))}
      </View>

      <LinearGradient
        colors={[colors.pine, '#183931']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.6, y: 1 }}
        style={styles.heroCard}
      >
        <Text style={styles.heroEyebrow}>Today's easiest step</Text>
        <Text style={styles.heroTitle}>{hero.title}</Text>
        <Text style={styles.heroBody}>{hero.body}</Text>
        <Pressable style={styles.heroButton} onPress={() => navigation.navigate('CheckIn')}>
          <Text style={styles.heroButtonText}>Do the 20-second version</Text>
        </Pressable>
      </LinearGradient>

      <View style={styles.pillars}>
        <PillarChip
          name="Heart"
          state="Holding steady"
          onPress={() => navigation.navigate('MyHealth', { pillar: 'heart' })}
        />
        <PillarChip
          name="Weight"
          state="Holding steady"
          onPress={() => navigation.navigate('MyHealth', { pillar: 'weight' })}
        />
        <PillarChip
          name="Calm"
          state="Worth a look"
          watch
          onPress={() => navigation.navigate('MyHealth', { pillar: 'calm' })}
        />
        <PillarChip
          name="Mind"
          state="Holding steady"
          onPress={() => navigation.navigate('MyHealth', { pillar: 'mind' })}
        />
      </View>

      <TextLink
        label="Preview: returning after 3 weeks away"
        variant="muted"
        onPress={() => setReentryPreview((value) => !value)}
      />
    </ScreenLayout>
  );
}
