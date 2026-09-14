import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ScreenLayout from '../../../components/ScreenLayout';
import ScreenHeader from '../../../components/ScreenHeader';
import AuthMark from '../../../components/AuthMark';
import TextField from '../../../components/TextField';
import PrimaryButton from '../../../components/PrimaryButton';
import TextLink from '../../../components/TextLink';
import FormError from '../../../components/FormError';
import { signupSchema } from '../../../validations/signup';
import { useSignupMutation } from '../../../network/authentication/authQueries';

export default function SignupScreen({ navigation }) {
  const signup = useSignupMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
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
        eyebrow="Get started"
        headline="Create your account"
        sub="Takes about a minute — you can adjust everything later in Settings."
      />

      <TextField control={control} name="name" label="Name" placeholder="Your name" error={errors.name?.message} />
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
      <TextField
        control={control}
        name="confirmPassword"
        label="Confirm password"
        placeholder="••••••••"
        secureTextEntry
        error={errors.confirmPassword?.message}
      />

      <FormError message={signup.isError ? signup.error.message : null} />

      <PrimaryButton label="Create account" onPress={handleSubmit(onSubmit)} loading={signup.isPending} />

      <TextLink label="Already have an account? Log in" onPress={() => navigation.navigate('Login')} />
    </ScreenLayout>
  );
}
