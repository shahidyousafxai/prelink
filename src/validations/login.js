import { z } from 'zod';

export const getLoginSchema = (t) =>
  z.object({
    email: z.string().email(t('validations.invalidEmail')),
    password: z.string().min(6, t('validations.passwordMin')),
  });
