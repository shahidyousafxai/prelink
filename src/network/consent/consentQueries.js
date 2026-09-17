import { useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../http';

// Stage 1 defaults granted since there's no path to Home without completing
// it during onboarding. The other three stages are session-only shared
// state — modeled as a query-cache value (like session/onboarding) so every
// screen that reads or grants a stage sees the same data, without
// reintroducing Context/Zustand for something the cache already covers.
// Matches the prototype's own in-memory-only consent object: nothing here
// is persisted to disk, by design.
const DEFAULT_CONSENT = { s1: true, s2: false, s3: false, s4: false };

export function useConsentQuery() {
  return useQuery({
    queryKey: queryKeys.consent.all(),
    queryFn: () => DEFAULT_CONSENT,
    staleTime: Infinity,
  });
}

export function useSetConsentStage() {
  const queryClient = useQueryClient();

  return (stage, granted) => {
    queryClient.setQueryData(queryKeys.consent.all(), (prev) => ({
      ...(prev ?? DEFAULT_CONSENT),
      [stage]: granted,
    }));
  };
}
