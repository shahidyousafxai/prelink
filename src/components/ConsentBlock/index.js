import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, shadows } from '../../theme/theme';
import Badge from '../shared/Badge';

// Matches the prototype's `.consent-block` (optionally dimmed for the
// "later, if you choose" preview block). The leading icon gives an instant
// visual cue for which state a block is in — active now vs. not yet —
// instead of relying on opacity and copy alone.
export default function ConsentBlock({ badge, title, description, dimmed }) {
  return (
    <View style={[styles.block, dimmed && styles.dimmed]}>
      <View style={styles.titleRow}>
        <View style={[styles.iconWrap, dimmed && styles.iconWrapDimmed]}>
          <Ionicons
            name={dimmed ? 'time-outline' : 'checkmark-circle'}
            size={15}
            color={dimmed ? colors.inkSoft : colors.pine}
          />
        </View>
        {badge && <Badge label={badge} />}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 10,
    ...shadows.sm,
  },
  dimmed: { opacity: 0.5, shadowOpacity: 0, elevation: 0 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' },
  iconWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.pineSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapDimmed: { backgroundColor: colors.sandDeep },
  title: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.ink },
  description: { fontSize: 12.5, fontFamily: fonts.body, color: colors.inkSoft, lineHeight: 18 },
});
