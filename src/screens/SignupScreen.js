import { Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthScreenLayout from '../components/AuthScreenLayout';
import AuthMark from '../components/AuthMark';
import TextField from '../components/TextField';
import PrimaryButton from '../components/PrimaryButton';
import TextLink from '../components/TextLink';
import { signupSchema } from '../validations/signup';
import { useSignupMutation } from '../network/authentication/authQueries';
import { colors, fonts } from '../theme/theme';

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
      await signup.mutateAsync(values);
    } catch {
      // Surfaced via signup.error below.
    }
  };

  return (
    <AuthScreenLayout>
      <AuthMark />
      <Text style={styles.eyebrow}>Get started</Text>
      <Text style={styles.headline}>Create your account</Text>
      <Text style={styles.sub}>Takes about a minute — you can adjust everything later in Settings.</Text>

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

      {signup.isError && <Text style={styles.formError}>{signup.error.message}</Text>}

      <PrimaryButton label="Create account" onPress={handleSubmit(onSubmit)} loading={signup.isPending} />

      <TextLink label="Already have an account? Log in" onPress={() => navigation.navigate('Login')} />
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  eyebrow: { fontSize: 11, fontFamily: fonts.bodySemiBold, color: colors.inkSoft, marginBottom: 6 },
  headline: { fontSize: 21, fontFamily: fonts.headline, color: colors.ink, marginBottom: 6 },
  sub: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, lineHeight: 19.5, marginBottom: 20 },
  formError: { fontSize: 12, fontFamily: fonts.bodySemiBold, color: colors.clay, textAlign: 'center', marginBottom: 8 },
});
