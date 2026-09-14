import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useOnboardingStatusQuery, useSessionQuery } from '../network/authentication/authQueries';
import BaselineScreen from '../screens/BaselineScreen';
import ConsentScreen from '../screens/ConsentScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import LanguageScreen from '../screens/LanguageScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated } = useSessionQuery();
  const { needsOnboarding } = useOnboardingStatusQuery();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated && needsOnboarding ? (
        // Shown once, right after Sign Up, before the user ever reaches Home.
        <>
          <Stack.Screen name="OnboardingLanguage" component={LanguageScreen} />
          <Stack.Screen name="OnboardingConsent" component={ConsentScreen} />
          <Stack.Screen name="OnboardingBaseline" component={BaselineScreen} />
        </>
      ) : isAuthenticated ? (
        // Protected route: only mounted while signed in and onboarded.
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        // Public routes: only mounted while signed out.
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      )}

      {/* Common route: registered unconditionally, reachable from any stack above. */}
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
