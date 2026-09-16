import { Pressable, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../theme/theme';

// `variant="pill"` (default) matches the prototype's `.chip`/`.chip.sel`
// (chip-grid). `variant="tile"` matches `.mood-chip`/`.mood-chip.sel` —
// equal-width tiles for a fixed-count row like Home's mood picker.
export default function Chip({ label, selected, onPress, variant = 'pill' }) {
  const isTile = variant === 'tile';
  return (
    <Pressable style={[styles.chip, isTile && styles.tile, selected && styles.selected]} onPress={onPress}>
      <Text style={[styles.label, isTile && styles.tileLabel, selected && styles.selectedLabel]}>{label}</Text>
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
  tile: {
    flex: 1,
    borderRadius: radius.md,
    paddingVertical: 9,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  selected: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  label: { fontSize: 12.5, fontFamily: fonts.bodySemiBold, color: colors.inkSoft },
  tileLabel: { fontSize: 11 },
  selectedLabel: { color: '#7A5A1E' },
});
