import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius } from '../theme/theme';

// Matches the prototype's `.mark` — a 48x48 pine rounded square with a
// cream icon, shown at the top of every onboarding/auth screen.
export default function AuthMark() {
  return (
    <View style={styles.mark}>
      <Ionicons name="leaf-outline" size={24} color={colors.sand} />
    </View>
  );
}

const styles = StyleSheet.create({
  mark: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.pine,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
});
