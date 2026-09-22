import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../../theme/theme';
import Badge from '../shared/Badge';

// Matches the prototype's `.consent-block` (optionally dimmed for the
// "later, if you choose" preview block).
export default function ConsentBlock({ badge, title, description, dimmed }) {
  return (
    <View style={[styles.block, dimmed && styles.dimmed]}>
      <View style={styles.titleRow}>
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
  },
  dimmed: { opacity: 0.5 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' },
  title: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.ink },
  description: { fontSize: 12.5, fontFamily: fonts.body, color: colors.inkSoft, lineHeight: 18 },
});
