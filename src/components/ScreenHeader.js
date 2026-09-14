import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts } from '../theme/theme';
import Badge from './Badge';

// Matches the prototype's `.eyebrow` + `.headline` + `.sub` trio, repeated
// at the top of nearly every screen. `badge` renders the small stage pill
// (e.g. "Consent 1 of 4") used on the onboarding/consent screens.
export default function ScreenHeader({ eyebrow, badge, headline, sub }) {
  return (
    <View style={styles.wrap}>
      {(eyebrow || badge) && (
        <View style={styles.topRow}>
          {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
          {badge && <Badge label={badge} />}
        </View>
      )}
      <Text style={styles.headline}>{headline}</Text>
      {sub && <Text style={styles.sub}>{sub}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 20 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' },
  eyebrow: { fontSize: 11, fontFamily: fonts.bodySemiBold, color: colors.inkSoft },
  headline: { fontSize: 21, fontFamily: fonts.headline, color: colors.ink, marginBottom: 6 },
  sub: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, lineHeight: 19.5 },
});
