import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ScreenLayout from '../../components/ScreenLayout';
import ScreenHeader from '../../components/ScreenHeader';
import AuthMark from '../../components/AuthMark';
import TextField from '../../components/TextField';
import PrimaryButton from '../../components/PrimaryButton';
import TextLink from '../../components/TextLink';
import FormError from '../../components/FormError';
import { loginSchema } from '../../validations/login';
import { useLoginMutation } from '../../network/authentication/authQueries';

export default function LoginScreen({ navigation }) {
  const login = useLoginMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
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
      <ScreenHeader
        eyebrow="Welcome back"
        headline="Sign in to PreLink"
        sub="A calmer way to look after your wellbeing."
      />

      <TextField
        control={control}
        name="email"
        label="Email"
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        error={errors.email?.message}
      />
      <TextField
        control={control}
        name="password"
        label="Password"
        placeholder="••••••••"
        secureTextEntry
        error={errors.password?.message}
      />

      <FormError message={login.isError ? login.error.message : null} />

      <PrimaryButton label="Log in" onPress={handleSubmit(onSubmit)} loading={login.isPending} />

      <TextLink label="Forgot password?" onPress={() => navigation.navigate('ForgotPassword')} />
      <TextLink label="Don't have an account? Create one" onPress={() => navigation.navigate('Signup')} />
    </ScreenLayout>
  );
}
