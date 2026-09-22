import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../../../theme/theme';

// Matches the prototype's `.data-table` — a bordered card of key/value rows.
export default function DataTable({ rows }) {
  return (
    <View style={styles.table}>
      {rows.map((row, index) => (
        <View key={row.key} style={[styles.row, index === rows.length - 1 && styles.lastRow]}>
          <Text style={styles.key}>{row.key}</Text>
          <Text style={styles.value}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    backgroundColor: colors.white,
  },
  lastRow: { borderBottomWidth: 0 },
  key: { fontSize: 11.5, fontFamily: fonts.body, color: colors.inkSoft },
  value: { fontSize: 11.5, fontFamily: fonts.bodyBold, color: colors.ink, textAlign: 'right' },
});
