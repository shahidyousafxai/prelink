import { Text, StyleSheet } from 'react-native';

import { colors, fonts } from '../../theme/theme';
import AnimatedPressable from '../shared/AnimatedPressable';

// Matches the prototype's `.settings-row`.
export default function SettingsRow({ label, value, onPress, last }) {
  return (
    <AnimatedPressable style={[styles.row, last && styles.lastRow]} onPress={onPress} scaleTo={0.98}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value ? `${value} ›` : '›'}</Text>
    </AnimatedPressable>
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
