import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../../theme/theme';

// Matches the prototype's `.future-ribbon` — flags content that follows an
// existing template (e.g. "same template as Mind") but isn't designed or
// built for real yet.
export default function FutureRibbon({ label }) {
  return (
    <View style={styles.ribbon}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ribbon: {
    alignSelf: 'flex-start',
    backgroundColor: colors.claySoft,
    borderRadius: radius.sm - 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  label: { fontSize: 10.5, fontFamily: fonts.bodyBold, color: '#7A3B27', letterSpacing: 0.4 },
});
