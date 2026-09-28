import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import HomeScreen from '../screens/home/HomeScreen';
import PillarScreen from '../screens/home/PillarScreen';
import CarePlanScreen from '../screens/home/CarePlanScreen';
import SettingsStack from './SettingsStack';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

// Matches the prototype's `.app-tabs` bottom bar — shown on Home, Pillar
// Detail, Care Plan, and Settings ("Today" / "My Health" / "Care Plan" /
// "You"). Rendered via CustomTabBar (a floating rounded bar) instead of the
// default bottom-tabs styling.
export default function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        // Bottom-tabs has no "slide" transition (that's a stack-only
        // concept) — 'shift' is the closest built-in equivalent, sliding the
        // outgoing/incoming scene content horizontally like a swipe.
        animation: 'shift',
      }}
    >
      <Tab.Screen name="Today" component={HomeScreen} options={{ tabBarLabel: t('tabs.today') }} />
      <Tab.Screen name="MyHealth" component={PillarScreen} options={{ tabBarLabel: t('tabs.myHealth') }} />
      <Tab.Screen name="CarePlan" component={CarePlanScreen} options={{ tabBarLabel: t('tabs.carePlan') }} />
      <Tab.Screen name="You" component={SettingsStack} options={{ tabBarLabel: t('tabs.you') }} />
    </Tab.Navigator>
  );
}
