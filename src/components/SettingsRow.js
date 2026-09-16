import { Pressable, Text, StyleSheet } from 'react-native';

import { colors, fonts } from '../theme/theme';

// Matches the prototype's `.settings-row`.
export default function SettingsRow({ label, value, onPress, last }) {
  return (
    <Pressable style={[styles.row, last && styles.lastRow]} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value ? `${value} ›` : '›'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  lastRow: { borderBottomWidth: 0 },
  label: { fontSize: 13, fontFamily: fonts.bodySemiBold, color: colors.ink },
  value: { fontSize: 11.5, fontFamily: fonts.body, color: colors.inkSoft },
});
