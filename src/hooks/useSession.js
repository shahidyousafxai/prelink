import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../services/queryKeys';
import { getAuthToken } from '../utils/storage';

// The token never changes on its own between sign-in/sign-out, so it
// never needs a background refetch — those two mutations update the
// cache directly via queryClient.setQueryData.
export function useSession() {
  const { data: token, isLoading } = useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: getAuthToken,
    staleTime: Infinity,
  });

  return { isLoading, isAuthenticated: Boolean(token) };
}
