import { Text, StyleSheet } from 'react-native';

import { colors, radius } from '../theme/theme';

// Matches the prototype's `.disclaimer-banner`.
export default function Banner({ children }) {
  return <Text style={styles.banner}>{children}</Text>;
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.claySoft,
    borderRadius: radius.sm,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 12,
    fontWeight: '600',
    color: '#5a2c1c',
    marginBottom: 14,
    lineHeight: 17,
  },
});
