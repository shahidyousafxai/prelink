import { Text, StyleSheet } from 'react-native';

import { colors, fonts, radius, shadows } from '../../theme/theme';
import AnimatedPressable from '../shared/AnimatedPressable';

// Matches the prototype's `.big-opt` — a full-width selectable option row.
export default function OptionButton({ label, onPress }) {
  return (
    <AnimatedPressable style={styles.button} onPress={onPress} scaleTo={0.98}>
      <Text style={styles.label}>{label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radius.lg,
    paddingVertical: 15,
    paddingHorizontal: 16,
    ...shadows.sm,
  },
  label: { fontSize: 14, fontFamily: fonts.bodySemiBold, color: colors.ink },
});
