import { Pressable, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../theme/theme';

// Matches the prototype's `.big-opt` — a full-width selectable option row.
export default function OptionButton({ label, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
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
  },
  label: { fontSize: 14, fontFamily: fonts.bodySemiBold, color: colors.ink },
});
