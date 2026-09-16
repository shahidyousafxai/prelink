import ScreenLayout from '../../../components/ScreenLayout';
import ScreenHeader from '../../../components/ScreenHeader';
import PrimaryButton from '../../../components/PrimaryButton';
import FormError from '../../../components/FormError';
import { useLogoutMutation } from '../../../network/authentication/authQueries';

// The "You" tab in MainTabs — only ever mounted while signed in, so unlike
// before, there's no signed-out case to handle here anymore.
export default function SettingsScreen() {
  const logout = useLogoutMutation();

  return (
    <ScreenLayout>
      <ScreenHeader headline="Settings" />

      {/* Logging out flips auth state; RootNavigator swaps back to the
          public stack automatically. */}
      <PrimaryButton
        label={logout.isPending ? 'Logging out...' : 'Log out'}
        onPress={() => logout.mutate()}
        loading={logout.isPending}
      />
      <FormError message={logout.isError ? logout.error.message : null} />
    </ScreenLayout>
  );
}
