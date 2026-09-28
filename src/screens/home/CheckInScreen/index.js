import { useRef, useState } from 'react';
import { Animated, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import OptionButton from '../../../components/OptionButton';
import { colors } from '../../../theme/theme';
import { styles } from './styles';

// Matches the fixed order of home.checkIn.options: Clear / A little foggy /
// Very foggy — icon, gradient, and card tint go from bright/gold (clear) to
// muted/dark (very foggy), visually matching the increasing fog.
const OPTION_META = [
  { icon: 'sunny-outline', gradient: [colors.gold, '#8B6529'], tint: colors.goldSoft },
  { icon: 'cloudy-outline', gradient: [colors.clay, '#7A4433'], tint: colors.claySoft },
  { icon: 'cloud-outline', gradient: ['#4A4845', colors.ink], tint: colors.sandDeep },
];

// Deliberately almost no chrome — this is the atomic unit the whole
// Micro-Commitment Flywheel depends on. Auto-returns to Today shortly after
// logging, with no forced follow-up questions. The confirmation circle is a
// bespoke pine gradient (not the shared ConfirmCheck, which stays flat/plain
// for its other, lower-stakes uses) with a spring-in entrance, matching this
// moment being the one payoff of the whole 15-second interaction.
export default function CheckInScreen({ navigation }) {
  const { t } = useTranslation();
  const [done, setDone] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const options = t('home.checkIn.options', { returnObjects: true });

  const logMood = () => {
    setDone(true);
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 14, bounciness: 10 }).start();
    setTimeout(() => navigation.navigate('Main', { screen: 'Today' }), 1300);
  };

  if (done) {
    return (
      <ScreenLayout>
        <Animated.View style={{ transform: [{ scale }] }}>
          <LinearGradient colors={[colors.pine, '#183931']} style={styles.doneCircle}>
            <Ionicons name="checkmark" size={40} color={colors.white} />
          </LinearGradient>
        </Animated.View>
        <Text style={styles.doneTitle}>{t('home.checkIn.doneTitle')}</Text>
        <Text style={styles.doneSub}>{t('home.checkIn.doneSub')}</Text>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <Text style={styles.headline}>{t('home.checkIn.headline')}</Text>
      <Text style={styles.sub}>{t('home.checkIn.sub')}</Text>
      <View style={styles.options}>
        {options.map((option, index) => (
          <OptionButton
            key={option}
            label={option}
            icon={OPTION_META[index]?.icon}
            gradient={OPTION_META[index]?.gradient}
            tint={OPTION_META[index]?.tint}
            onPress={logMood}
          />
        ))}
      </View>
    </ScreenLayout>
  );
}
