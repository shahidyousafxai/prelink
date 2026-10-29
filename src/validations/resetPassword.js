import { z } from 'zod';

export const getResetPasswordSchema = (t) =>
  z
    .object({
      email: z.string().email(t('validations.invalidEmail')),
      code: z.string().trim().regex(/^\d{6}$/, t('validations.resetCodeInvalid')),
      password: z.string().min(6, t('validations.passwordMin')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validations.passwordsDontMatch'),
      path: ['confirmPassword'],
    });
