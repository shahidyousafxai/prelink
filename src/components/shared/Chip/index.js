import { Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius } from '../../../theme/theme';
import AnimatedPressable from '../AnimatedPressable';

// `variant="pill"` (default) matches the prototype's `.chip`/`.chip.sel`
// (chip-grid). `variant="tile"` matches `.mood-chip`/`.mood-chip.sel` —
// equal-width tiles for a fixed-count row like Home's mood picker. `icon`
// is optional (only Home's mood tiles use it) — a quick visual glyph above
// the label instead of text alone.
// `variant="grid"` matches `.word-tile`/`.word-tile.sel` — larger tiles in
// a 2-column grid, like the Assessment Task's word-recall options.
export default function Chip({ label, selected, onPress, variant = 'pill', icon }) {
  const isTile = variant === 'tile';
  const isGrid = variant === 'grid';
  return (
    <AnimatedPressable
      style={[styles.chip, isTile && styles.tile, isGrid && styles.grid, selected && styles.selected]}
      onPress={onPress}
      scaleTo={0.94}
    >
      {icon && (
        <Ionicons name={icon} size={18} color={selected ? '#7A5A1E' : colors.inkSoft} style={styles.icon} />
      )}
      <Text
        style={[
          styles.label,
          isTile && styles.tileLabel,
          isGrid && styles.gridLabel,
          selected && styles.selectedLabel,
        ]}
      >
        {label}
      </Text>
    </AnimatedPressable>
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
    paddingVertical: 13,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  icon: { marginBottom: 4 },
  grid: {
    flexBasis: '48%',
    flexGrow: 1,
    borderRadius: radius.md,
    paddingVertical: 15,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  selected: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  label: { fontSize: 12.5, fontFamily: fonts.bodySemiBold, color: colors.inkSoft },
  tileLabel: { fontSize: 11 },
  gridLabel: { fontSize: 13.5, color: colors.ink },
  selectedLabel: { color: '#7A5A1E' },
});
