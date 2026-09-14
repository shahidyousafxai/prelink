import { Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthScreenLayout from '../components/AuthScreenLayout';
import AuthMark from '../components/AuthMark';
import TextField from '../components/TextField';
import PrimaryButton from '../components/PrimaryButton';
import TextLink from '../components/TextLink';
import { loginSchema } from '../validations/login';
import { useLoginMutation } from '../network/authentication/authQueries';
import { colors, fonts } from '../theme/theme';

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
    <AuthScreenLayout>
      <AuthMark />
      <Text style={styles.eyebrow}>Welcome back</Text>
      <Text style={styles.headline}>Sign in to PreLink</Text>
      <Text style={styles.sub}>A calmer way to look after your wellbeing.</Text>

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

      {login.isError && <Text style={styles.formError}>{login.error.message}</Text>}

      <PrimaryButton label="Log in" onPress={handleSubmit(onSubmit)} loading={login.isPending} />

      <TextLink label="Forgot password?" onPress={() => navigation.navigate('ForgotPassword')} />
      <TextLink label="Don't have an account? Create one" onPress={() => navigation.navigate('Signup')} />
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  eyebrow: { fontSize: 11, fontFamily: fonts.bodySemiBold, color: colors.inkSoft, marginBottom: 6 },
  headline: { fontSize: 21, fontFamily: fonts.headline, color: colors.ink, marginBottom: 6 },
  sub: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, lineHeight: 19.5, marginBottom: 20 },
  formError: { fontSize: 12, fontFamily: fonts.bodySemiBold, color: colors.clay, textAlign: 'center', marginBottom: 8 },
});
