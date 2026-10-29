import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PillarScreen from '../screens/home/PillarScreen';
import CalmScreen from '../screens/home/CalmScreen';

const Stack = createNativeStackNavigator();

// The "My Health" tab's own stack. Mind (PillarScreen) is the default —
// it's the only pillar with real engagement content. Calm is a sibling
// route here (not a RootNavigator-level screen) because the prototype
// marks it `with-tabs`: it's a browsable pillar page like Mind, not a
// focused flow — so it needs the tab bar to stay visible, same as
// Settings' nested stack keeps the tab bar for its own sub-screens.
export default function MyHealthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Mind" component={PillarScreen} />
      <Stack.Screen name="Calm" component={CalmScreen} />
    </Stack.Navigator>
  );
}
