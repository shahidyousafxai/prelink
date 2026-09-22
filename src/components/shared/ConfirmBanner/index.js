import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../../../theme/theme';

// Matches the prototype's `.confirm-inline` — a success banner shown after
// an action completes (invite sent, referral logged, encouragement sent...).
export default function ConfirmBanner({ children }) {
  return (
    <View style={styles.banner}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { backgroundColor: colors.pineSoft, borderRadius: radius.md, padding: 14, marginBottom: 14 },
  text: { fontSize: 13, fontFamily: fonts.bodySemiBold, color: '#1c3b32', textAlign: 'center' },
});
