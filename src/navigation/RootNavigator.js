import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSession } from '../hooks/useSession';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated } = useSession();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // Protected route: only mounted while signed in.
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        // Public route: only mounted while signed out.
        <Stack.Screen name="Login" component={LoginScreen} />
      )}

      {/* Common route: registered unconditionally, reachable from either stack above. */}
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
