import { Pressable, Text, StyleSheet } from 'react-native';

import { colors, radius, fonts } from '../theme/theme';

// Matches the prototype's `.btn-secondary`.
export default function SecondaryButton({ label, onPress, disabled }) {
  return (
    <Pressable style={[styles.button, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.pine,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    width: '100%',
  },
  disabled: { borderColor: colors.line },
  label: { fontSize: 14, fontFamily: fonts.bodyBold, color: colors.pine },
  labelDisabled: { color: colors.inkSoft },
});
