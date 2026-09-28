import { View, Text, StyleSheet, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../../theme/theme';
import AnimatedPressable from '../shared/AnimatedPressable';

// Matches the prototype's `.settings-row`, grouped inside a card by the
// screen rather than floating as bare bordered rows on the sand background.
// `icon`/`accent` give each row a colored identity instead of plain text.
export default function SettingsRow({ label, value, icon, accent, onPress, last }) {
  return (
    <AnimatedPressable style={[styles.row, last && styles.lastRow]} onPress={onPress} scaleTo={0.98}>
      {icon && (
        <View style={[styles.avatar, { backgroundColor: accent }]}>
          <Ionicons name={icon} size={15} color={colors.white} />
        </View>
      )}
      <Text style={styles.label}>{label}</Text>
      <View style={styles.trailing}>
        {value && <Text style={styles.value}>{value}</Text>}
        <Ionicons
          name={I18nManager.isRTL ? 'chevron-back' : 'chevron-forward'}
          size={15}
          color={colors.inkSoft}
        />
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  lastRow: { borderBottomWidth: 0 },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    ...(I18nManager.isRTL ? { marginLeft: 12 } : { marginRight: 12 }),
  },
  label: { flex: 1, fontSize: 13, fontFamily: fonts.bodySemiBold, color: colors.ink },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  value: { fontSize: 11.5, fontFamily: fonts.body, color: colors.inkSoft },
});
