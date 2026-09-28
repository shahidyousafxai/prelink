import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../screens/settings/SettingsScreen';
import ManageConsentView from '../screens/settings/SettingsScreen/ManageConsentView';
import InviteCaregiverView from '../screens/settings/SettingsScreen/InviteCaregiverView';
import AboutView from '../screens/settings/SettingsScreen/AboutView';
import LanguageView from '../screens/settings/SettingsScreen/LanguageView';

const Stack = createNativeStackNavigator();

// The "You" tab's own stack. Manage Consent / Invite a Caregiver / About /
// Language used to be switched via local view-state inside SettingsScreen,
// which meant no transition animation at all when opening them — now real
// routes, so they slide in/out like every other screen in the app, and the
// parent Tab.Navigator still keeps the bottom tab bar visible throughout.
export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="SettingsList" component={SettingsScreen} />
      <Stack.Screen name="ManageConsent" component={ManageConsentView} />
      <Stack.Screen name="InviteCaregiver" component={InviteCaregiverView} />
      <Stack.Screen name="About" component={AboutView} />
      <Stack.Screen name="Language" component={LanguageView} />
    </Stack.Navigator>
  );
}
