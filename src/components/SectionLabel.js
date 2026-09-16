import { Text, StyleSheet } from 'react-native';

import { colors, fonts } from '../theme/theme';

// Matches the prototype's `.eyebrow` used as a repeated section header
// within a screen's body — distinct from ScreenHeader's top-of-screen
// eyebrow, which only appears once per screen.
export default function SectionLabel({ children, style }) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: { fontSize: 11, fontFamily: fonts.bodySemiBold, color: colors.inkSoft, marginBottom: 8 },
});
