import { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, shadows } from '../theme/theme';
import AnimatedPressable from '../components/shared/AnimatedPressable';

const TAB_ICONS = {
  Today: 'today-outline',
  MyHealth: 'heart-outline',
  CarePlan: 'clipboard-outline',
  You: 'person-outline',
};

const BAR_PADDING = 5;
// Large enough to always resolve to a true stadium/pill shape (half the
// bar's actual height) no matter the final measured height, instead of a
// fixed value that could end up smaller than that and read as a rounded
// rectangle rather than a pill.
const PILL_RADIUS = 999;

// Replaces the default bottom-tabs bar (which only lets you style the icon
// and label slots separately) with a floating rounded card, inset from the
// screen edges. The active-tab pill is a single Animated.View that slides
// between tabs (measured off the bar's own onLayout width, since flex:1
// tabs don't have a fixed width to compute from upfront) rather than each
// tab toggling its own background — that was an instant jump, not a move.
export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const tabWidth = barWidth ? (barWidth - BAR_PADDING * 2) / state.routes.length : 0;

  useEffect(() => {
    if (!tabWidth) return;
    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      speed: 16,
      bounciness: 6,
    }).start();
  }, [state.index, tabWidth]);

  return (
    <View style={[styles.shadowWrap, { bottom: insets.bottom }]}>
      <View style={styles.wrap} onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}>
        {tabWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[styles.indicator, { width: tabWidth, transform: [{ translateX }] }]}
          />
        )}
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <AnimatedPressable key={route.key} onPress={onPress} style={styles.tab} scaleTo={0.93}>
              <Ionicons name={TAB_ICONS[route.name]} size={18} color={isFocused ? colors.pine : colors.inkSoft} />
              <Text style={[styles.label, isFocused && styles.labelActive]}>{label}</Text>
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Separate from `wrap` because a view can't both cast a shadow and clip
  // its children on iOS — overflow:hidden (needed to keep the sliding
  // indicator and tabs inside the pill shape) silently clips the shadow
  // away too if it's on the same view.
  shadowWrap: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: PILL_RADIUS,
    backgroundColor: colors.white,
    ...shadows.md,
  },
  wrap: {
    flexDirection: 'row',
    borderRadius: PILL_RADIUS,
    padding: BAR_PADDING,
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    top: BAR_PADDING,
    bottom: BAR_PADDING,
    left: BAR_PADDING,
    backgroundColor: colors.pineSoft,
    borderRadius: PILL_RADIUS,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 7,
    borderRadius: PILL_RADIUS,
  },
  label: { fontSize: 9.5, fontFamily: fonts.bodySemiBold, color: colors.inkSoft },
  labelActive: { color: colors.pine },
});
