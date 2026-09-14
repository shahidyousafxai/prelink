import { View, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthScreenLayout from '../components/AuthScreenLayout';
import AuthMark from '../components/AuthMark';
import TextField from '../components/TextField';
import PrimaryButton from '../components/PrimaryButton';
import TextLink from '../components/TextLink';
import { forgotPasswordSchema } from '../validations/forgotPassword';
import { useForgotPasswordMutation } from '../network/authentication/authQueries';
import { colors, fonts } from '../theme/theme';

export default function ForgotPasswordScreen({ navigation }) {
  const forgotPassword = useForgotPasswordMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (values) => forgotPassword.mutate(values);

  return (
    <AuthScreenLayout>
      <AuthMark />
      <Text style={styles.eyebrow}>Password help</Text>
      <Text style={styles.headline}>Reset your password</Text>
      <Text style={styles.sub}>We'll send a reset link to your email.</Text>

      {forgotPassword.isSuccess ? (
        <View style={styles.confirm}>
          <Text style={styles.confirmText}>
            If an account exists for that email, a reset link is on its way.
          </Text>
        </View>
      ) : (
        <>
          <TextField
            control={control}
            name="email"
            label="Email"
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email?.message}
          />
          {forgotPassword.isError && <Text style={styles.formError}>{forgotPassword.error.message}</Text>}
          <PrimaryButton label="Send reset link" onPress={handleSubmit(onSubmit)} loading={forgotPassword.isPending} />
        </>
      )}

      <TextLink label="Back to log in" onPress={() => navigation.navigate('Login')} />
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  eyebrow: { fontSize: 11, fontFamily: fonts.bodySemiBold, color: colors.inkSoft, marginBottom: 6 },
  headline: { fontSize: 21, fontFamily: fonts.headline, color: colors.ink, marginBottom: 6 },
  sub: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, lineHeight: 19.5, marginBottom: 20 },
  formError: { fontSize: 12, fontFamily: fonts.bodySemiBold, color: colors.clay, textAlign: 'center', marginBottom: 8 },
  confirm: { backgroundColor: colors.pineSoft, borderRadius: 14, padding: 14 },
  confirmText: { fontSize: 13, fontFamily: fonts.bodySemiBold, color: '#1c3b32', textAlign: 'center' },
});
