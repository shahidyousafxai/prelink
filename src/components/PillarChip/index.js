import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, shadows } from '../../theme/theme';
import AnimatedPressable from '../shared/AnimatedPressable';

// Matches the prototype's `.pillar-chip` — one tile in Home's 2x2 pillar
// grid. `dim` matches `.pillar-chip.dim` for pillars without a detail
// screen yet (Heart/Weight/Calm) — present, but not tappable. The icon
// avatar (colored per pillar) gives each card its own identity instead of
// 4 identical plain text boxes.
export default function PillarChip({ name, state, icon, accent, watch, dim, onPress }) {
  return (
    <AnimatedPressable
      style={[styles.chip, dim && styles.dim]}
      onPress={dim ? undefined : onPress}
      disabled={dim}
      scaleTo={0.96}
    >
      <View style={[styles.avatar, { backgroundColor: accent }]}>
        <Ionicons name={icon} size={18} color={colors.white} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.state, watch && styles.watch]}>{state}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.lg,
    padding: 14,
    flexBasis: '48%',
    flexGrow: 1,
    ...shadows.sm,
  },
  dim: { opacity: 0.55 },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  name: { fontSize: 12.5, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 3 },
  state: { fontSize: 11, fontFamily: fonts.bodySemiBold, color: colors.pine },
  watch: { color: colors.clay },
});
