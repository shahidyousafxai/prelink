import { View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ScreenLayout from '../../../components/ScreenLayout';
import ScreenHeader from '../../../components/ScreenHeader';
import AuthMark from '../../../components/AuthMark';
import TextField from '../../../components/TextField';
import PrimaryButton from '../../../components/PrimaryButton';
import TextLink from '../../../components/TextLink';
import FormError from '../../../components/FormError';
import { forgotPasswordSchema } from '../../../validations/forgotPassword';
import { useForgotPasswordMutation } from '../../../network/authentication/authQueries';
import { styles } from './styles';

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
    <ScreenLayout>
      <AuthMark />
      <ScreenHeader
        eyebrow="Password help"
        headline="Reset your password"
        sub="We'll send a reset link to your email."
      />

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
          <FormError message={forgotPassword.isError ? forgotPassword.error.message : null} />
          <PrimaryButton label="Send reset link" onPress={handleSubmit(onSubmit)} loading={forgotPassword.isPending} />
        </>
      )}

      <TextLink label="Back to log in" onPress={() => navigation.navigate('Login')} />
    </ScreenLayout>
  );
}
