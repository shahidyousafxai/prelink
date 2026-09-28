import { useEffect, useRef } from 'react';
import { Animated, KeyboardAvoidingView, Platform, ScrollView, Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, shadows } from '../../theme/theme';

// Shared shell for the 3 auth screens (Login/Signup/Forgot Password): a
// gradient hero panel (same pine tones as Home's hero card) with the logo
// mark, headline and sub-copy, and the form rendered as a white "sheet"
// overlapping its rounded bottom edge, with a one-time fade + slide-up
// entrance for that sheet.
export default function AuthHeroLayout({ eyebrow, headline, sub, children }) {
  const insets = useSafeAreaInsets();

  const entrance = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(entrance, { toValue: 1, duration: 420, useNativeDriver: true }).start();
  }, [entrance]);
  const entranceStyle = {
    opacity: entrance,
    transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
  };

  return (
    <View style={styles.flex}>
      <LinearGradient
        colors={[colors.pine, '#132C25']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + 28 }]}
      >
        <View style={styles.mark}>
          <Ionicons name="leaf-outline" size={26} color={colors.sand} />
        </View>
        <Text style={styles.heroEyebrow}>{eyebrow}</Text>
        <Text style={styles.heroHeadline}>{headline}</Text>
        {sub && <Text style={styles.heroSub}>{sub}</Text>}
      </LinearGradient>

      <KeyboardAvoidingView style={styles.form} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: Math.max(insets.bottom, 24) + 24 }]}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.card, entranceStyle]}>{children}</Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.sand },
  // A separate style (rather than reusing `flex`) so it can carry a zIndex
  // above the hero — they're siblings under the same parent, and the card's
  // negative marginTop needs this to reliably paint on top of the hero
  // instead of getting tucked behind it.
  form: { flex: 1, zIndex: 1 },
  hero: {
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: radius.xl * 1.6,
    borderBottomRightRadius: radius.xl * 1.6,
    alignItems: 'center',
  },
  mark: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroEyebrow: { fontSize: 11.5, fontFamily: fonts.bodySemiBold, color: colors.pineSoft, marginBottom: 4 },
  heroHeadline: {
    fontSize: 22,
    fontFamily: fonts.headlineBold,
    color: colors.white,
    marginBottom: 6,
    textAlign: 'center',
  },
  heroSub: {
    fontSize: 13,
    fontFamily: fonts.body,
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    lineHeight: 19,
  },
  scroll: { flexGrow: 1, paddingHorizontal: 24 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    paddingHorizontal: 22,
    paddingBottom: 22,
    paddingTop: 30,
    marginTop: -18,
    ...shadows.md,
  },
});
