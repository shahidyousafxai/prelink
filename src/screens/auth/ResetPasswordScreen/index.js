import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import AuthHeroLayout from '../../../components/AuthHeroLayout';
import TextField from '../../../components/shared/TextField';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import TextLink from '../../../components/shared/TextLink';
import FormError from '../../../components/shared/FormError';
import ConfirmBanner from '../../../components/shared/ConfirmBanner';
import { getResetPasswordSchema } from '../../../validations/resetPassword';
import { useResetPasswordMutation } from '../../../network/authentication/authQueries';

export default function ResetPasswordScreen({ navigation, route }) {
  const { t } = useTranslation();
  const resetPassword = useResetPasswordMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(useMemo(() => getResetPasswordSchema(t), [t])),
    // Prefilled when coming from Forgot Password, so the user only types the code.
    defaultValues: { email: route.params?.email ?? '', code: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (values) => resetPassword.mutate(values);

  return (
    <AuthHeroLayout
      eyebrow={t('auth.resetPassword.eyebrow')}
      headline={t('auth.resetPassword.headline')}
      sub={t('auth.resetPassword.sub')}
    >
      {resetPassword.isSuccess ? (
        <ConfirmBanner>{t('auth.resetPassword.success')}</ConfirmBanner>
      ) : (
        <>
          <TextField
            control={control}
            name="email"
            label={t('auth.resetPassword.emailLabel')}
            placeholder={t('auth.resetPassword.emailPlaceholder')}
            icon="mail-outline"
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email?.message}
          />
          <TextField
            control={control}
            name="code"
            label={t('auth.resetPassword.codeLabel')}
            placeholder={t('auth.resetPassword.codePlaceholder')}
            icon="key-outline"
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            maxLength={6}
            error={errors.code?.message}
          />
          <TextField
            control={control}
            name="password"
            label={t('auth.resetPassword.passwordLabel')}
            placeholder={t('auth.resetPassword.passwordPlaceholder')}
            icon="lock-closed-outline"
            secureTextEntry
            error={errors.password?.message}
          />
          <TextField
            control={control}
            name="confirmPassword"
            label={t('auth.resetPassword.confirmPasswordLabel')}
            placeholder={t('auth.resetPassword.passwordPlaceholder')}
            icon="lock-closed-outline"
            secureTextEntry
            error={errors.confirmPassword?.message}
          />
          <FormError message={resetPassword.isError ? resetPassword.error.message : null} />
          <PrimaryButton
            label={t('auth.resetPassword.submit')}
            onPress={handleSubmit(onSubmit)}
            loading={resetPassword.isPending}
          />
        </>
      )}

      <TextLink label={t('auth.resetPassword.backToLogin')} onPress={() => navigation.navigate('Login')} />
    </AuthHeroLayout>
  );
}
