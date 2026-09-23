import { z } from 'zod';

export const getForgotPasswordSchema = (t) =>
  z.object({
    email: z.string().email(t('validations.invalidEmail')),
  });
