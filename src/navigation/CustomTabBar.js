import { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, shadows } from '../theme/theme';
import AnimatedPressable from '../components/shared/AnimatedPressable';

const TAB_ICONS = {
  Today: 'today-outline',
  MyHealth: 'heart-outline',
  CarePlan: 'clipboard-outline',
  You: 'person-outline',
};

const BAR_PADDING = 6;

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
    <View
      style={[styles.wrap, { bottom: insets.bottom }]}
      onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
    >
      {tabWidth > 0 && (
        <Animated.View style={[styles.indicator, { width: tabWidth, transform: [{ translateX }] }]} />
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
            <Ionicons name={TAB_ICONS[route.name]} size={20} color={isFocused ? colors.pine : colors.inkSoft} />
            <Text style={[styles.label, isFocused && styles.labelActive]}>{label}</Text>
          </AnimatedPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    padding: BAR_PADDING,
    ...shadows.md,
  },
  indicator: {
    position: 'absolute',
    top: BAR_PADDING,
    bottom: BAR_PADDING,
    left: BAR_PADDING,
    backgroundColor: colors.pineSoft,
    borderRadius: radius.pill - 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 9,
    borderRadius: radius.pill - 4,
  },
  label: { fontSize: 10.5, fontFamily: fonts.bodySemiBold, color: colors.inkSoft },
  labelActive: { color: colors.pine },
});
