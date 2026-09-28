import { View, Text, StyleSheet } from 'react-native';
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

// Replaces the default bottom-tabs bar (which only lets you style the icon
// and label slots separately) with a floating rounded card, inset from the
// screen edges, where the active tab gets a pill background wrapping both
// its icon and label — the "more stylish" look requested over the old flat,
// edge-to-edge bar with a small icon-only swatch.
export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { bottom: insets.bottom + 12 }]}>
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
          <AnimatedPressable
            key={route.key}
            onPress={onPress}
            style={[styles.tab, isFocused && styles.tabActive]}
            scaleTo={0.93}
          >
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
    padding: 6,
    ...shadows.md,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 9,
    borderRadius: radius.pill - 4,
  },
  tabActive: { backgroundColor: colors.pineSoft },
  label: { fontSize: 10.5, fontFamily: fonts.bodySemiBold, color: colors.inkSoft },
  labelActive: { color: colors.pine },
});
