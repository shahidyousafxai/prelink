import { Text, StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

// Matches the prototype's `.section-title` — a small uppercase group
// header used in lists (e.g. "Consent & sharing", "Account" in Settings).
export default function SectionTitle({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    fontFamily: fonts.bodyBold,
    color: colors.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginTop: 14,
    marginBottom: 4,
  },
});
