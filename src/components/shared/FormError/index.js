import { Text, StyleSheet, I18nManager } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

// Matches the prototype's `.warn-inline` — a clay-colored notice. Centered
// (the default) for a whole-form mutation error below the submit button;
// `align="left"` matches a single field's validation error instead.
export default function FormError({ message, align = 'center' }) {
  if (!message) return null;
  return <Text style={[styles.text, align === 'left' && styles.left]}>{message}</Text>;
}

const styles = StyleSheet.create({
  text: { fontSize: 12, fontFamily: fonts.bodySemiBold, color: colors.clay, textAlign: 'center', marginBottom: 8 },
  left: { textAlign: I18nManager.isRTL ? 'right' : 'left', marginBottom: 0, marginTop: 6 },
});
