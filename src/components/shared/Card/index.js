import { View, StyleSheet } from 'react-native';

import { colors, radius, shadows } from '../../../theme/theme';
import AnimatedPressable from '../AnimatedPressable';

// Matches the prototype's `.card`. Renders as an AnimatedPressable when
// `onPress` is given, a plain View otherwise.
export default function Card({ children, onPress, style }) {
  const Component = onPress ? AnimatedPressable : View;
  const pressProps = onPress ? { onPress, scaleTo: 0.98 } : {};
  return (
    <Component style={[styles.card, style]} {...pressProps}>
      {children}
    </Component>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.lg,
    padding: 16,
    ...shadows.sm,
  },
});
