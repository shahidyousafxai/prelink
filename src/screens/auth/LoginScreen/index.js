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
import { getLoginSchema } from '../../../validations/login';
import { useLoginMutation } from '../../../network/authentication/authQueries';

export default function LoginScreen({ navigation }) {
  const { t } = useTranslation();
  const login = useLoginMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(useMemo(() => getLoginSchema(t), [t])),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values) => {
    try {
      // Signing in flips auth state; RootNavigator swaps to the protected
      // stack automatically, so no manual navigation call is needed here.
      await login.mutateAsync(values);
    } catch {
      // Surfaced via login.error below.
    }
  };

  return (
    <ScreenLayout>
      <AuthMark />
      <ScreenHeader eyebrow={t('auth.login.eyebrow')} headline={t('auth.login.headline')} sub={t('auth.login.sub')} />

      <TextField
        control={control}
        name="email"
        label={t('auth.login.emailLabel')}
        placeholder={t('auth.login.emailPlaceholder')}
        autoCapitalize="none"
        keyboardType="email-address"
        error={errors.email?.message}
      />
      <TextField
        control={control}
        name="password"
        label={t('auth.login.passwordLabel')}
        placeholder={t('auth.login.passwordPlaceholder')}
        secureTextEntry
        error={errors.password?.message}
      />

      <FormError message={login.isError ? login.error.message : null} />

      <PrimaryButton label={t('auth.login.submit')} onPress={handleSubmit(onSubmit)} loading={login.isPending} />

      <TextLink label={t('auth.login.forgotPassword')} onPress={() => navigation.navigate('ForgotPassword')} />
      <TextLink label={t('auth.login.noAccount')} onPress={() => navigation.navigate('Signup')} />
    </ScreenLayout>
  );
}
