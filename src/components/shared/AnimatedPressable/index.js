import { useRef } from 'react';
import { Animated, Pressable } from 'react-native';

import { tapFeedback } from '../../../utils/haptics';

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

// Every tappable surface in the app (buttons, chips, rows, cards) used a
// plain Pressable with no feedback beyond React Navigation's default
// opacity dim — this adds a consistent scale-down-on-press animation plus a
// light haptic tap, in one place, instead of repeating it per component.
export default function AnimatedPressable({ style, scaleTo = 0.97, disabled, onPressIn, onPressOut, onPress, ...props }) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue) => {
    Animated.spring(scale, { toValue, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
  };

  return (
    <AnimatedPressableBase
      {...props}
      disabled={disabled}
      onPressIn={(e) => {
        if (!disabled) animateTo(scaleTo);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        animateTo(1);
        onPressOut?.(e);
      }}
      onPress={(e) => {
        if (!disabled) tapFeedback();
        onPress?.(e);
      }}
      style={[style, { transform: [{ scale }] }]}
    />
  );
}
