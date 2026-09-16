import { View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ScreenHeader from '../../../components/ScreenHeader';
import BackButton from '../../../components/BackButton';
import TextField from '../../../components/TextField';
import ToggleRow from '../../../components/ToggleRow';
import PrimaryButton from '../../../components/PrimaryButton';
import FormError from '../../../components/FormError';
import { inviteCaregiverSchema } from '../../../validations/inviteCaregiver';
import { useInviteCaregiverMutation } from '../../../network/caregiver/caregiverQueries';
import { styles } from './styles';

// This screen is simultaneously the invite flow and the Stage 3 consent
// screen — sharing only becomes possible once both the invite and the
// toggle happen together.
export default function InviteCaregiverView({ onBack }) {
  const invite = useInviteCaregiverMutation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inviteCaregiverSchema),
    defaultValues: { name: '', share: false },
  });
  const share = watch('share');

  const onSubmit = (values) => invite.mutate(values);

  if (invite.isSuccess) {
    return (
      <>
        <BackButton label="Settings" onPress={onBack} />
        <View style={styles.confirm}>
          <Text style={styles.confirmText}>
            Invite sent to {invite.data.name}. They'll see a stability summary only, once accepted.
          </Text>
        </View>
        <PrimaryButton label="Done" onPress={onBack} />
      </>
    );
  }

  return (
    <>
      <BackButton label="Settings" onPress={onBack} />
      <ScreenHeader
        eyebrow="Stage 3 of 4 · Caregiver support"
        headline="Invite a caregiver"
        sub="They'll only ever see stability summaries — never raw scores, individual answers, or exports."
      />
      <TextField
        control={control}
        name="name"
        label="Their name"
        placeholder="Their name"
        error={errors.name?.message}
      />
      <ToggleRow control={control} name="share" label="Share summary-level updates with them" />
      <FormError message={invite.isError ? invite.error.message : null} />
      <PrimaryButton
        label="Send invite"
        onPress={handleSubmit(onSubmit)}
        disabled={!share}
        loading={invite.isPending}
      />
    </>
  );
}
