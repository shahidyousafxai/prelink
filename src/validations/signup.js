import { z } from 'zod';

export const getSignupSchema = (t) =>
  z
    .object({
      name: z.string().min(2, t('validations.nameMin')),
      email: z.string().email(t('validations.invalidEmail')),
      password: z.string().min(6, t('validations.passwordMin')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validations.passwordsDontMatch'),
      path: ['confirmPassword'],
    });
