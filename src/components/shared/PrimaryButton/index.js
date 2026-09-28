import { Text, StyleSheet, ActivityIndicator } from 'react-native';

import { colors, radius, fonts, shadows } from '../../../theme/theme';
import AnimatedPressable from '../AnimatedPressable';

// Matches the prototype's `.btn-primary` / `.btn-primary.disabled`.
export default function PrimaryButton({ label, onPress, disabled, loading }) {
  const isDisabled = disabled || loading;

  return (
    <AnimatedPressable style={[styles.button, isDisabled && styles.disabled]} onPress={onPress} disabled={isDisabled}>
      {loading ? (
        <ActivityIndicator color={colors.inkSoft} />
      ) : (
        <Text style={[styles.label, isDisabled && styles.labelDisabled]}>{label}</Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.pine,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    ...shadows.md,
  },
  disabled: { backgroundColor: colors.sandDeep, shadowOpacity: 0, elevation: 0 },
  label: { color: colors.white, fontSize: 14.5, fontFamily: fonts.bodyBold },
  labelDisabled: { color: colors.inkSoft },
});
