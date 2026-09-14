import { useMutation, useQueryClient } from '@tanstack/react-query';

import { login } from '../services/authService';
import { queryKeys } from '../services/queryKeys';
import { saveAuthToken } from '../utils/storage';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      await saveAuthToken(data.token);
      queryClient.setQueryData(queryKeys.auth.session, data.token);
    },
  });
}
