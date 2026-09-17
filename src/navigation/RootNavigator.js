import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useOnboardingStatusQuery, useSessionQuery } from '../network/authentication/authQueries';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import AssessmentTaskScreen from '../screens/home/AssessmentTaskScreen';
import CheckInScreen from '../screens/home/CheckInScreen';
import Consent2Screen from '../screens/home/Consent2Screen';
import InsightScreen from '../screens/home/InsightScreen';
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
        // Protected: the bottom-tab app shell, plus a few focused flows that
        // are registered as siblings (not nested inside MainTabs) so they
        // take over the full screen and hide the tab bar — matching the
        // prototype, where Check-in/Assessment Task/Consent 2/Insight all
        // lack the `with-tabs` class.
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="CheckIn" component={CheckInScreen} />
          <Stack.Screen name="AssessmentTask" component={AssessmentTaskScreen} />
          <Stack.Screen name="Consent2" component={Consent2Screen} />
          <Stack.Screen name="Insight" component={InsightScreen} />
        </>
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
