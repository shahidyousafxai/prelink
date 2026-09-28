import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius } from '../../theme/theme';
import BackButton from '../shared/BackButton';
import PrimaryButton from '../shared/PrimaryButton';

// The 3-step onboarding wizard (Language -> Consent -> Baseline): a light
// sand background, a slim segmented progress bar (this wizard's own step
// count — unrelated to the app's separate 4-stage consent system, which
// Consent's own ScreenHeader badge still shows independently), and the
// continue button pinned to the bottom instead of scrolling away with the
// content. Each screen renders its own ScreenHeader as the first scroll
// child, since Language/Consent/Baseline each need a different header shape.
export default function OnboardingWizardLayout({
  step,
  totalSteps,
  backLabel,
  onBack,
  children,
  primaryLabel,
  onPrimaryPress,
  primaryDisabled,
  primaryLoading,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.flex, { paddingTop: Math.max(insets.top, 20) }]}>
      <View style={styles.topBar}>
        <View style={styles.progressRow}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View key={index} style={[styles.segment, index < step && styles.segmentFilled]} />
          ))}
        </View>
        {onBack && <BackButton label={backLabel} onPress={onBack} />}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <PrimaryButton
          label={primaryLabel}
          onPress={onPrimaryPress}
          disabled={primaryDisabled}
          loading={primaryLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.sand },
  topBar: { paddingHorizontal: 24, marginBottom: 8, gap: 10 },
  progressRow: { flexDirection: 'row', gap: 6 },
  segment: { flex: 1, height: 4, borderRadius: radius.sm - 8, backgroundColor: colors.line },
  segmentFilled: { backgroundColor: colors.pine },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
});
