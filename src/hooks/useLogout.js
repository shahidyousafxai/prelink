import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../services/queryKeys';
import { clearAuthToken } from '../utils/storage';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearAuthToken,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.session, null);
    },
  });
}
