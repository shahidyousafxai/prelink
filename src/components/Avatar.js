import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts } from '../theme/theme';

// Matches the prototype's `.avatar` — an initials circle.
export default function Avatar({ initial }) {
  return (
    <View style={styles.circle}>
      <Text style={styles.initial}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.claySoft,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  initial: { fontSize: 14, fontFamily: fonts.bodyBold, color: colors.clay },
});
