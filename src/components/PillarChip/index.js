import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, shadows } from '../../theme/theme';
import AnimatedPressable from '../shared/AnimatedPressable';

// Matches the prototype's `.pillar-chip` — one tile in Home's 2x2 pillar
// grid. The icon avatar (colored per pillar) gives each card its own
// identity instead of 4 identical plain text boxes. `stateVariant` matches
// the prototype's `.state` modifiers: 'default' (pine — Calm's real,
// working state), 'neutral' (italic, muted — Heart/Weight's honest
// "not available yet"), 'locked' (a distinct grey — Mind's interpretation
// gated behind clinical approval). Heart/Weight stay tappable despite being
// unavailable, matching the prototype's own `.unavailable` (not `.dim`)
// treatment — they open an honest explanation screen, not nothing.
export default function PillarChip({ name, state, icon, accent, stateVariant = 'default', onPress }) {
  return (
    <AnimatedPressable style={styles.chip} onPress={onPress} scaleTo={0.96}>
      <View style={[styles.avatar, { backgroundColor: accent }]}>
        <Ionicons name={icon} size={18} color={colors.white} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text
        style={[
          styles.state,
          stateVariant === 'neutral' && styles.stateNeutral,
          stateVariant === 'locked' && styles.stateLocked,
        ]}
      >
        {state}
      </Text>
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
  stateNeutral: { color: colors.inkSoft, fontStyle: 'italic', fontFamily: fonts.body },
  stateLocked: { color: '#5A6270' },
});
