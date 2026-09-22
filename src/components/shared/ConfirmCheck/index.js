import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../../theme/theme';

// Matches the prototype's `.confirm-check` — the circular checkmark shown
// after completing a check-in, task, or escalation.
export default function ConfirmCheck() {
  return (
    <View style={styles.circle}>
      <Ionicons name="checkmark" size={26} color={colors.pine} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.pineSoft,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
});
