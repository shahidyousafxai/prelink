import { Pressable, Text, StyleSheet, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../../../theme/theme';

// Matches the prototype's `.back-row` — a small "‹ Label" link, typically
// wired to navigation.goBack() so users can revisit an earlier onboarding
// screen and change an answer. The chevron points toward the reading
// direction's "back" edge — right in RTL, left in LTR.
export default function BackButton({ label = 'Back', onPress }) {
  return (
    <Pressable style={styles.row} onPress={onPress} hitSlop={8}>
      <Ionicons name={I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'} size={16} color={colors.inkSoft} />
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12, alignSelf: 'flex-start' },
  text: { fontSize: 13, fontFamily: fonts.bodySemiBold, color: colors.inkSoft },
});
