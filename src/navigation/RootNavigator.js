import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useOnboardingStatusQuery, useSessionQuery } from '../network/authentication/authQueries';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import AssessmentTaskScreen from '../screens/home/AssessmentTaskScreen';
import CaregiverHomeScreen from '../screens/home/CaregiverHomeScreen';
import CheckInScreen from '../screens/home/CheckInScreen';
import ClinicianCaseScreen from '../screens/home/ClinicianCaseScreen';
import ClinicianGateScreen from '../screens/home/ClinicianGateScreen';
import ClinicianQueueScreen from '../screens/home/ClinicianQueueScreen';
import Consent2Screen from '../screens/home/Consent2Screen';
import Consent4Screen from '../screens/home/Consent4Screen';
import EscalationSentScreen from '../screens/home/EscalationSentScreen';
import InsightScreen from '../screens/home/InsightScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';
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
        // prototype, where none of these screens have the `with-tabs` class.
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="CheckIn" component={CheckInScreen} />
          <Stack.Screen name="AssessmentTask" component={AssessmentTaskScreen} />
          <Stack.Screen name="Consent2" component={Consent2Screen} />
          <Stack.Screen name="Insight" component={InsightScreen} />
          <Stack.Screen name="Consent4" component={Consent4Screen} />
          <Stack.Screen name="EscalationSent" component={EscalationSentScreen} />
          {/* Role previews — this app has no real separate caregiver/clinician
              login, so these mirror the prototype's own "Preview controls"
              role switcher instead of pretending to be real auth. Reached
              from Settings. */}
          <Stack.Screen name="CaregiverHome" component={CaregiverHomeScreen} />
          <Stack.Screen name="ClinicianGate" component={ClinicianGateScreen} />
          <Stack.Screen name="ClinicianQueue" component={ClinicianQueueScreen} />
          <Stack.Screen name="ClinicianCase" component={ClinicianCaseScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
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
