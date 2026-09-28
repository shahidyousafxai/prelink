import { View, Text, StyleSheet, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius } from '../../../theme/theme';

// Matches the prototype's `.data-table` — a bordered card of key/value rows.
// `icon`/`accent` on a row are optional (About's the only current consumer)
// — a small colored glyph instead of plain text alone.
export default function DataTable({ rows }) {
  return (
    <View style={styles.table}>
      {rows.map((row, index) => (
        <View key={row.key} style={[styles.row, index === rows.length - 1 && styles.lastRow]}>
          <View style={styles.leading}>
            {row.icon && (
              <View style={[styles.avatar, { backgroundColor: row.accent }]}>
                <Ionicons name={row.icon} size={13} color={colors.white} />
              </View>
            )}
            <Text style={styles.key}>{row.key}</Text>
          </View>
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
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    backgroundColor: colors.white,
  },
  lastRow: { borderBottomWidth: 0 },
  leading: { flexDirection: 'row', alignItems: 'center', flexShrink: 1 },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...(I18nManager.isRTL ? { marginLeft: 8 } : { marginRight: 8 }),
  },
  key: { fontSize: 11.5, fontFamily: fonts.body, color: colors.inkSoft },
  value: { fontSize: 11.5, fontFamily: fonts.bodyBold, color: colors.ink, textAlign: 'right' },
});
