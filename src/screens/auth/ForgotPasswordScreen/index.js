import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import AuthMark from '../../../components/AuthMark';
import TextField from '../../../components/shared/TextField';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import TextLink from '../../../components/shared/TextLink';
import FormError from '../../../components/shared/FormError';
import ConfirmBanner from '../../../components/shared/ConfirmBanner';
import { getForgotPasswordSchema } from '../../../validations/forgotPassword';
import { useForgotPasswordMutation } from '../../../network/authentication/authQueries';

export default function ForgotPasswordScreen({ navigation }) {
  const { t } = useTranslation();
  const forgotPassword = useForgotPasswordMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(useMemo(() => getForgotPasswordSchema(t), [t])),
    defaultValues: { email: '' },
  });

  const onSubmit = (values) => forgotPassword.mutate(values);

  return (
    <ScreenLayout>
      <AuthMark />
      <ScreenHeader
        eyebrow={t('auth.forgotPassword.eyebrow')}
        headline={t('auth.forgotPassword.headline')}
        sub={t('auth.forgotPassword.sub')}
      />

      {forgotPassword.isSuccess ? (
        <ConfirmBanner>{t('auth.forgotPassword.success')}</ConfirmBanner>
      ) : (
        <>
          <TextField
            control={control}
            name="email"
            label={t('auth.forgotPassword.emailLabel')}
            placeholder={t('auth.forgotPassword.emailPlaceholder')}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email?.message}
          />
          <FormError message={forgotPassword.isError ? forgotPassword.error.message : null} />
          <PrimaryButton
            label={t('auth.forgotPassword.submit')}
            onPress={handleSubmit(onSubmit)}
            loading={forgotPassword.isPending}
          />
        </>
      )}

      <TextLink label={t('auth.forgotPassword.backToLogin')} onPress={() => navigation.navigate('Login')} />
    </ScreenLayout>
  );
}
