import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useOnboardingStatusQuery, useSessionQuery } from '../network/authentication/authQueries';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import BaselineScreen from '../screens/onboarding/BaselineScreen';
import ConsentScreen from '../screens/onboarding/ConsentScreen';
import LanguageScreen from '../screens/onboarding/LanguageScreen';
import MainTabs from './MainTabs';

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
        // Protected: the bottom-tab app shell (Today / My Health / Care Plan / You).
        // Settings now lives inside it as the "You" tab, so it's no longer a
        // separately-registered common route — nothing outside the tab bar
        // links to it anymore.
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        // Public routes: only mounted while signed out.
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
