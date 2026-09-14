import { Pressable, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../theme/theme';

// Matches the prototype's `.chip` / `.chip.sel`.
export default function Chip({ label, selected, onPress }) {
  return (
    <Pressable style={[styles.chip, selected && styles.selected]} onPress={onPress}>
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radius.pill - 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  selected: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  label: { fontSize: 12.5, fontFamily: fonts.bodySemiBold, color: colors.inkSoft },
  selectedLabel: { color: '#7A5A1E' },
});
