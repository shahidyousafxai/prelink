import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import HomeScreen from '../screens/home/HomeScreen';
import PillarScreen from '../screens/home/PillarScreen';
import CarePlanScreen from '../screens/home/CarePlanScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { colors, fonts, radius } from '../theme/theme';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Today: 'today-outline',
  MyHealth: 'heart-outline',
  CarePlan: 'clipboard-outline',
  You: 'person-outline',
};

function TabIcon({ focused, name }) {
  return (
    <View style={[styles.dot, focused && styles.dotActive]}>
      <Ionicons name={TAB_ICONS[name]} size={14} color={focused ? colors.pine : colors.inkSoft} />
    </View>
  );
}

// Matches the prototype's `.app-tabs` bottom bar — shown on Home, Pillar
// Detail, Care Plan, and Settings ("Today" / "My Health" / "Care Plan" /
// "You"). The prototype's tab icons are plain color swatches; these use
// real Ionicons inside the same swatch shape.
export default function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.pine,
        tabBarInactiveTintColor: colors.inkSoft,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tab.Screen
        name="Today"
        component={HomeScreen}
        options={{
          tabBarLabel: t('tabs.today'),
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="Today" />,
        }}
      />
      <Tab.Screen
        name="MyHealth"
        component={PillarScreen}
        options={{
          tabBarLabel: t('tabs.myHealth'),
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="MyHealth" />,
        }}
      />
      <Tab.Screen
        name="CarePlan"
        component={CarePlanScreen}
        options={{
          tabBarLabel: t('tabs.carePlan'),
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="CarePlan" />,
        }}
      />
      <Tab.Screen
        name="You"
        component={SettingsScreen}
        options={{
          tabBarLabel: t('tabs.you'),
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="You" />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 10,
  },
  label: { fontSize: 11, fontFamily: fonts.bodySemiBold },
  dot: {
    width: 22,
    height: 22,
    borderRadius: radius.sm - 5,
    backgroundColor: colors.sandDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActive: { backgroundColor: colors.pineSoft },
});
