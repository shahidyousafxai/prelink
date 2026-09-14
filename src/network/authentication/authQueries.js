import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../http';
import { clearAuthToken, getAuthToken, saveAuthToken } from '../../utils/storage';
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

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: async (data) => {
      await saveAuthToken(data.token);
      queryClient.setQueryData(queryKeys.auth.session(), data.token);
    },
  });
}

export function useSignupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupFn,
    onSuccess: async (data) => {
      await saveAuthToken(data.token);
      queryClient.setQueryData(queryKeys.auth.session(), data.token);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearAuthToken,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.session(), null);
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: forgotPasswordFn,
  });
}
