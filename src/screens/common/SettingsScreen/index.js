import ScreenLayout from '../../../components/ScreenLayout';
import ScreenHeader from '../../../components/ScreenHeader';
import BackButton from '../../../components/BackButton';
import PrimaryButton from '../../../components/PrimaryButton';
import FormError from '../../../components/FormError';
import { useLogoutMutation, useSessionQuery } from '../../../network/authentication/authQueries';

// Common route: registered outside the auth check in RootNavigator, so it's
// reachable from both the public (signed-out) and protected (signed-in) stacks.
export default function SettingsScreen({ navigation }) {
  const { isAuthenticated } = useSessionQuery();
  const logout = useLogoutMutation();

  return (
    <ScreenLayout>
      <BackButton label="Back" onPress={() => navigation.goBack()} />
      <ScreenHeader
        headline="Settings"
        sub={isAuthenticated ? 'Signed in — this screen is reachable either way.' : 'Not signed in — this screen is reachable either way.'}
      />

      {isAuthenticated && (
        <>
          {/* Logging out flips auth state; RootNavigator swaps back to the
              public stack automatically. */}
          <PrimaryButton
            label={logout.isPending ? 'Logging out...' : 'Log out'}
            onPress={() => logout.mutate()}
            loading={logout.isPending}
          />
          <FormError message={logout.isError ? logout.error.message : null} />
        </>
      )}
    </ScreenLayout>
  );
}
