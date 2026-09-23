import { z } from 'zod';

export const getInviteCaregiverSchema = (t) =>
  z.object({
    name: z.string().min(1, t('validations.caregiverNameRequired')),
  });
