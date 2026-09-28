import { View, Text, StyleSheet, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius } from '../../../theme/theme';

// Matches the prototype's `.list-row` + `.tag`. `icon` is optional (Mind's
// activity list is the only current consumer) — a small leading glyph
// instead of plain text alone.
export default function ListRow({ label, tag, icon, last }) {
  return (
    <View style={[styles.row, last && styles.lastRow]}>
      <View style={styles.leading}>
        {icon && <Ionicons name={icon} size={15} color={colors.pine} style={styles.icon} />}
        <Text style={styles.label}>{label}</Text>
      </View>
      {tag && (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  lastRow: { borderBottomWidth: 0 },
  leading: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  icon: I18nManager.isRTL ? { marginLeft: 8 } : { marginRight: 8 },
  label: { fontSize: 12.5, fontFamily: fonts.body, color: colors.ink },
  tag: { backgroundColor: colors.sandDeep, borderRadius: radius.sm - 4, paddingVertical: 2, paddingHorizontal: 7 },
  tagText: { fontSize: 10.5, fontFamily: fonts.bodySemiBold, color: colors.inkSoft },
});
