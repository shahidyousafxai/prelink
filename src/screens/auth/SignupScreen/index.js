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
import { getSignupSchema } from '../../../validations/signup';
import { useSignupMutation } from '../../../network/authentication/authQueries';

export default function SignupScreen({ navigation }) {
  const { t } = useTranslation();
  const signup = useSignupMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(useMemo(() => getSignupSchema(t), [t])),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (values) => {
    try {
      // Signing up flips auth state and flags onboarding as needed;
      // RootNavigator swaps to the onboarding stack automatically.
      await signup.mutateAsync(values);
    } catch {
      // Surfaced via signup.error below.
    }
  };

  return (
    <ScreenLayout>
      <AuthMark />
      <ScreenHeader
        eyebrow={t('auth.signup.eyebrow')}
        headline={t('auth.signup.headline')}
        sub={t('auth.signup.sub')}
      />

      <TextField
        control={control}
        name="name"
        label={t('auth.signup.nameLabel')}
        placeholder={t('auth.signup.namePlaceholder')}
        error={errors.name?.message}
      />
      <TextField
        control={control}
        name="email"
        label={t('auth.signup.emailLabel')}
        placeholder={t('auth.signup.emailPlaceholder')}
        autoCapitalize="none"
        keyboardType="email-address"
        error={errors.email?.message}
      />
      <TextField
        control={control}
        name="password"
        label={t('auth.signup.passwordLabel')}
        placeholder={t('auth.signup.passwordPlaceholder')}
        secureTextEntry
        error={errors.password?.message}
      />
      <TextField
        control={control}
        name="confirmPassword"
        label={t('auth.signup.confirmPasswordLabel')}
        placeholder={t('auth.signup.passwordPlaceholder')}
        secureTextEntry
        error={errors.confirmPassword?.message}
      />

      <FormError message={signup.isError ? signup.error.message : null} />

      <PrimaryButton label={t('auth.signup.submit')} onPress={handleSubmit(onSubmit)} loading={signup.isPending} />

      <TextLink label={t('auth.signup.haveAccount')} onPress={() => navigation.navigate('Login')} />
    </ScreenLayout>
  );
}
