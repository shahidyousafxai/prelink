import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius } from '../../theme/theme';

// Matches the prototype's `.lock-ribbon` — flags a screen whose
// interpretation/status is gated behind clinical approval that hasn't
// happened yet. Distinct from FutureRibbon, which means "not built yet";
// this means "built, but what it would say isn't approved to show yet".
export default function LockRibbon({ label }) {
  return (
    <View style={styles.ribbon}>
      <Ionicons name="lock-closed" size={10} color={colors.lockText} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ribbon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    backgroundColor: colors.lockBg,
    borderRadius: radius.sm - 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  label: { fontSize: 10.5, fontFamily: fonts.bodyBold, color: colors.lockText, letterSpacing: 0.4 },
});
