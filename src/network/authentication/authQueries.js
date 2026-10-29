import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../http';
import {
  clearAuthToken,
  getAuthToken,
  getNeedsOnboarding,
  saveAuthToken,
  setNeedsOnboarding,
} from '../../utils/storage';
import { completeOnboardingFn, forgotPasswordFn, loginFn, resetPasswordFn, signupFn } from './authFns';

// Shared by login and signup. The backend's onboardingComplete flag decides
// whether the user lands on Home or restarts onboarding at Language; it's
// also cached locally so reopening the app routes the same way.
async function startSession(queryClient, { token, user }) {
  const needsOnboarding = !user.onboardingComplete;
  await saveAuthToken(token);
  await setNeedsOnboarding(needsOnboarding);
  queryClient.setQueryData(queryKeys.auth.session(), token);
  queryClient.setQueryData(queryKeys.auth.onboarding(), needsOnboarding);
}

// The token never changes on its own between sign-in/sign-out, so it never
// needs a background refetch — the mutations below update the cache
// directly via queryClient.setQueryData.
export function useSessionQuery() {
  const { data: token, isLoading } = useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: getAuthToken,
    staleTime: Infinity,
  });

  return { isLoading, isAuthenticated: Boolean(token) };
}

// Whether a signed-in user still needs to go through onboarding
// (Language -> Consent -> Baseline). Set from the backend on login/signup
// (see startSession) and read from storage on launch.
export function useOnboardingStatusQuery() {
  const { data: needsOnboarding, isLoading } = useQuery({
    queryKey: queryKeys.auth.onboarding(),
    queryFn: getNeedsOnboarding,
    staleTime: Infinity,
  });

  return { isLoading, needsOnboarding: Boolean(needsOnboarding) };
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => startSession(queryClient, data),
  });
}

export function useSignupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupFn,
    onSuccess: (data) => startSession(queryClient, data),
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearAuthToken,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.session(), null);
      queryClient.setQueryData(queryKeys.auth.onboarding(), null);
    },
  });
}

// Called when the Baseline screen finishes the onboarding flow. The local
// flag only flips after the backend confirms, so a failed request keeps the
// user on Baseline instead of letting the two get out of sync.
export function useCompleteOnboardingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeOnboardingFn,
    onSuccess: async () => {
      await setNeedsOnboarding(false);
      queryClient.setQueryData(queryKeys.auth.onboarding(), false);
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: forgotPasswordFn,
  });
}

// A successful reset invalidates every existing session server-side, so the
// user is sent back to Login rather than signed in here.
export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: resetPasswordFn,
  });
}
