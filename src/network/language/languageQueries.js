import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../http';
import { getLanguage, setLanguage } from '../../utils/storage';
import i18n from '../../i18n';
import { applyRTL } from '../../utils/rtl';

// Unlike onboarding/consent, the language choice is meant to survive app
// restarts (it's a device preference, not in-session prototype state), so
// it's persisted through AsyncStorage rather than being session-only.
export function useLanguageQuery() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.language.all(),
    queryFn: async () => (await getLanguage()) || i18n.language,
    staleTime: Infinity,
  });

  return { isLoading, language: data ?? i18n.language };
}

export function useSetLanguageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (code) => {
      await setLanguage(code);
      await i18n.changeLanguage(code);
      await applyRTL(code);
      return code;
    },
    onSuccess: (code) => {
      queryClient.setQueryData(queryKeys.language.all(), code);
    },
  });
}
