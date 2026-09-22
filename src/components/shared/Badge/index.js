import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../../../theme/theme';

// `variant="gold"` (default) matches the prototype's `.stage-badge` /
// `.flag.review`. `variant="pine"` matches `.flag.ok`.
export default function Badge({ label, variant = 'gold' }) {
  return (
    <View style={[styles.badge, variant === 'pine' && styles.pine]}>
      <Text style={[styles.label, variant === 'pine' && styles.pineLabel]}>{label}</Text>
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
  pine: { backgroundColor: colors.pineSoft },
  label: { fontSize: 10.5, fontFamily: fonts.bodyBold, color: '#7A5A1E' },
  pineLabel: { color: colors.pine },
});
