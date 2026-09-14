import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../http';
import {
  clearAuthToken,
  getAuthToken,
  getNeedsOnboarding,
  saveAuthToken,
  setNeedsOnboarding,
} from '../../utils/storage';
import { forgotPasswordFn, loginFn, signupFn } from './authFns';

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
// (Language -> Consent -> Baseline). Only a fresh Sign Up sets this; a
// returning Login always skips it.
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
    onSuccess: async (data) => {
      await saveAuthToken(data.token);
      await setNeedsOnboarding(false);
      queryClient.setQueryData(queryKeys.auth.session(), data.token);
      queryClient.setQueryData(queryKeys.auth.onboarding(), false);
    },
  });
}

export function useSignupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupFn,
    onSuccess: async (data) => {
      await saveAuthToken(data.token);
      await setNeedsOnboarding(true);
      queryClient.setQueryData(queryKeys.auth.session(), data.token);
      queryClient.setQueryData(queryKeys.auth.onboarding(), true);
    },
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

// Called when the Baseline screen finishes the onboarding flow.
export function useCompleteOnboardingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => setNeedsOnboarding(false),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.onboarding(), false);
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: forgotPasswordFn,
  });
}
