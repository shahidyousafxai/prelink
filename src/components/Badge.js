import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../theme/theme';

// Matches the prototype's `.stage-badge`.
export default function Badge({ label }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.goldSoft,
    borderRadius: radius.sm - 3,
    paddingVertical: 3,
    paddingHorizontal: 9,
    alignSelf: 'flex-start',
  },
  label: { fontSize: 10.5, fontFamily: fonts.bodyBold, color: '#7A5A1E' },
});
