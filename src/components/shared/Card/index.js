import { View, Pressable, StyleSheet } from 'react-native';

import { colors, radius } from '../../../theme/theme';

// Matches the prototype's `.card`. Renders as Pressable when `onPress` is
// given, a plain View otherwise.
export default function Card({ children, onPress, style }) {
  const Component = onPress ? Pressable : View;
  return (
    <Component style={[styles.card, style]} onPress={onPress}>
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
  },
});
