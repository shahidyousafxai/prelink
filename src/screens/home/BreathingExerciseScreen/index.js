import { useEffect, useRef, useState } from 'react';
import { Animated, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import BackButton from '../../../components/shared/BackButton';
import SecondaryButton from '../../../components/shared/SecondaryButton';
import { styles } from './styles';

const CYCLE_MS = 4000;
const TOTAL_SECONDS = 60;

// A genuinely working 60-second guided breathing exercise (the client
// upgraded Calm from a deferred placeholder to real content) — the circle
// expands/contracts on a 4-second cycle and the countdown is real. Stop and
// back both work at any point; nothing forces completion, and no mood
// diagnosis or risk score is attached to this in any way.
export default function BreathingExerciseScreen({ navigation }) {
  const { t } = useTranslation();
  const [breathingIn, setBreathingIn] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: breathingIn ? 1.25 : 1,
      duration: CYCLE_MS,
      useNativeDriver: true,
    }).start();
  }, [breathingIn, scale]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingIn((prev) => !prev);
      setSecondsLeft((prev) => {
        const next = prev - 4;
        if (next <= 0) {
          clearInterval(interval);
          navigation.goBack();
          return 0;
        }
        return next;
      });
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, [navigation]);

  return (
    <ScreenLayout center={false}>
      <BackButton label={t('home.calm.headline')} onPress={() => navigation.goBack()} />
      <View style={styles.centerFlow}>
        <Text style={styles.headline}>{t('home.breathing.headline')}</Text>
        <Text style={styles.sub}>{t('home.breathing.sub')}</Text>
        <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
          <Text style={styles.circleText}>
            {breathingIn ? t('home.breathing.in') : t('home.breathing.out')}
          </Text>
        </Animated.View>
        <Text style={styles.timer}>{t('home.breathing.seconds', { count: secondsLeft })}</Text>
        <SecondaryButton label={t('home.breathing.stop')} onPress={() => navigation.goBack()} />
      </View>
    </ScreenLayout>
  );
}
