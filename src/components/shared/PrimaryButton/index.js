import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { colors, radius, fonts } from '../../../theme/theme';

// Matches the prototype's `.btn-primary` / `.btn-primary.disabled`.
export default function PrimaryButton({ label, onPress, disabled, loading }) {
  const isDisabled = disabled || loading;

  return (
    <Pressable style={[styles.button, isDisabled && styles.disabled]} onPress={onPress} disabled={isDisabled}>
      {loading ? (
        <ActivityIndicator color={colors.inkSoft} />
      ) : (
        <Text style={[styles.label, isDisabled && styles.labelDisabled]}>{label}</Text>
      )}
    </Pressable>
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
  },
  disabled: { backgroundColor: colors.sandDeep },
  label: { color: colors.white, fontSize: 14.5, fontFamily: fonts.bodyBold },
  labelDisabled: { color: colors.inkSoft },
});
