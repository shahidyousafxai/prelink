import { View, Text, StyleSheet, I18nManager } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, shadows } from '../../theme/theme';
import AnimatedPressable from '../shared/AnimatedPressable';

// Matches the prototype's `.big-opt` — a full-width selectable option, as a
// compact row (gradient icon avatar + label) rather than a big centered
// stack. `icon`/`gradient`/`tint` are optional (CheckIn's only consumer
// passes them): a gradient icon avatar, a soft tinted card background, and
// a matching border — instead of a plain white box with a flat colored dot.
// No trailing chevron: tapping *is* the selection (it logs and navigates
// away immediately), not a drill-down into another screen, so a chevron
// would signal the wrong kind of interaction.
export default function OptionButton({ label, icon, gradient, tint, onPress }) {
  return (
    <AnimatedPressable
      style={[styles.button, tint && { backgroundColor: tint, borderColor: gradient?.[0] ?? colors.line }]}
      onPress={onPress}
      scaleTo={0.97}
    >
      {icon && gradient && (
        <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatar}>
          <Ionicons name={icon} size={18} color={colors.white} />
        </LinearGradient>
      )}
      <Text style={styles.label}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radius.lg,
    paddingVertical: 12,
    paddingHorizontal: 14,
    ...shadows.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...(I18nManager.isRTL ? { marginLeft: 12 } : { marginRight: 12 }),
  },
  label: { flex: 1, fontSize: 14, fontFamily: fonts.bodyBold, color: colors.ink },
});
