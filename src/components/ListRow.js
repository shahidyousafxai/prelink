import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../theme/theme';

// Matches the prototype's `.list-row` + `.tag`.
export default function ListRow({ label, tag, last }) {
  return (
    <View style={[styles.row, last && styles.lastRow]}>
      <Text style={styles.label}>{label}</Text>
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
  label: { fontSize: 12.5, fontFamily: fonts.body, color: colors.ink },
  tag: { backgroundColor: colors.sandDeep, borderRadius: radius.sm - 4, paddingVertical: 2, paddingHorizontal: 7 },
  tagText: { fontSize: 10.5, fontFamily: fonts.bodySemiBold, color: colors.inkSoft },
});
