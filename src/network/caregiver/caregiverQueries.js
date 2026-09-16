import { useMutation } from '@tanstack/react-query';

import { inviteCaregiverFn } from './caregiverFns';

export function useInviteCaregiverMutation() {
  return useMutation({
    mutationFn: inviteCaregiverFn,
  });
}
