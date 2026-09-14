import { Text, StyleSheet } from 'react-native';

import { colors, fonts } from '../theme/theme';

// Matches the prototype's `.field-label` — used both inside TextField and
// standalone above a ChipGroup.
export default function FieldLabel({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11.5,
    fontFamily: fonts.bodyBold,
    color: colors.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 7,
  },
});
