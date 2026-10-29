import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius } from '../../theme/theme';

// Matches the prototype's `.neutral-card` — the honest "not enough
// information" / "no interpretation available" placeholder shown instead of
// a fabricated judgment, wherever clinical approval for that judgment is
// still pending (paired with LockRibbon above it).
export default function NeutralCard({ children }) {
  return (
    <View style={styles.card}>
      <Ionicons name="ellipse-outline" size={18} color={colors.inkSoft} style={styles.icon} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutralBg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.lg,
    padding: 16,
    alignItems: 'center',
  },
  icon: { marginBottom: 6 },
  text: { fontSize: 12.5, fontFamily: fonts.body, color: colors.inkSoft, textAlign: 'center', lineHeight: 18 },
});
