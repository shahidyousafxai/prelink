import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useOnboardingStatusQuery, useSessionQuery } from '../network/authentication/authQueries';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import AssessmentTaskScreen from '../screens/home/AssessmentTaskScreen';
import BreathingExerciseScreen from '../screens/home/BreathingExerciseScreen';
import CaregiverHomeScreen from '../screens/home/CaregiverHomeScreen';
import CheckInScreen from '../screens/home/CheckInScreen';
import ClinicianCaseScreen from '../screens/home/ClinicianCaseScreen';
import ClinicianGateScreen from '../screens/home/ClinicianGateScreen';
import ClinicianQueueScreen from '../screens/home/ClinicianQueueScreen';
import Consent2Screen from '../screens/home/Consent2Screen';
import Consent4Screen from '../screens/home/Consent4Screen';
import HeartScreen from '../screens/home/HeartScreen';
import InsightScreen from '../screens/home/InsightScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';
import SummaryPreparedScreen from '../screens/home/SummaryPreparedScreen';
import SummaryPreviewScreen from '../screens/home/SummaryPreviewScreen';
import WeightScreen from '../screens/home/WeightScreen';
import BaselineScreen from '../screens/onboarding/BaselineScreen';
import ConsentScreen from '../screens/onboarding/ConsentScreen';
import LanguageScreen from '../screens/onboarding/LanguageScreen';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated } = useSessionQuery();
  const { needsOnboarding } = useOnboardingStatusQuery();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
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
          {/* Client reframe: this used to be live clinical escalation to a
              contracted clinician. There's no contracted care team yet, so
              it's now an explicit summary-preparation flow — preview exactly
              what's included before saving, then an honest "saved, no
              connected partner yet" status, never a false hand-off claim. */}
          <Stack.Screen name="SummaryPreview" component={SummaryPreviewScreen} />
          <Stack.Screen name="SummaryPrepared" component={SummaryPreparedScreen} />
          {/* Heart/Weight: honest "not available yet" screens (no with-tabs
              in the prototype, so full-screen like these others) — not a
              dressed-up copy of Mind's template. Calm/Mind live inside
              MyHealthStack instead, since they keep the tab bar visible. */}
          <Stack.Screen name="Heart" component={HeartScreen} />
          <Stack.Screen name="Weight" component={WeightScreen} />
          <Stack.Screen name="BreathingExercise" component={BreathingExerciseScreen} />
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
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
