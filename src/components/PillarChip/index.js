import { Pressable, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../../theme/theme';

// Matches the prototype's `.pillar-chip` — one tile in Home's 2x2 pillar
// grid. `dim` matches `.pillar-chip.dim` for pillars without a detail
// screen yet (Heart/Weight/Calm) — present, but not tappable.
export default function PillarChip({ name, state, watch, dim, onPress }) {
  return (
    <Pressable style={[styles.chip, dim && styles.dim]} onPress={dim ? undefined : onPress} disabled={dim}>
      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.state, watch && styles.watch]}>{state}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    padding: 13,
    flexBasis: '48%',
    flexGrow: 1,
  },
  dim: { opacity: 0.55 },
  name: { fontSize: 12, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 4 },
  state: { fontSize: 11, fontFamily: fonts.bodySemiBold, color: colors.pine },
  watch: { color: colors.clay },
});
