import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../../../theme/theme';

// Matches the prototype's `.field-label` — used both inside TextField and
// standalone above a ChipGroup. `icon` is optional (unused by most call
// sites) — a quick visual cue for what a question is about.
export default function FieldLabel({ children, icon }) {
  if (!icon) {
    return <Text style={styles.label}>{children}</Text>;
  }

  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={13} color={colors.inkSoft} />
      <Text style={[styles.label, styles.labelInRow]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11.5,
    fontFamily: fonts.bodyBold,
    color: colors.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 7,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 7 },
  labelInRow: { marginBottom: 0 },
});
