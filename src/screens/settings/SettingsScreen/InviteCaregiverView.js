import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import TextField from '../../../components/shared/TextField';
import ToggleRow from '../../../components/shared/ToggleRow';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import FormError from '../../../components/shared/FormError';
import ConfirmBanner from '../../../components/shared/ConfirmBanner';
import { inviteCaregiverSchema } from '../../../validations/inviteCaregiver';
import { useInviteCaregiverMutation } from '../../../network/caregiver/caregiverQueries';
import { useSetConsentStage } from '../../../network/consent/consentQueries';

// This screen is simultaneously the invite flow and the Stage 3 consent
// screen — sharing only becomes possible once both the invite and the
// toggle happen together. Sending the invite is what unlocks the Caregiver
// Home preview (Settings → Preview: Caregiver view).
export default function InviteCaregiverView({ onBack }) {
  const invite = useInviteCaregiverMutation();
  const setConsentStage = useSetConsentStage();
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

  const onSubmit = (values) =>
    invite.mutate(values, {
      onSuccess: () => setConsentStage('s3', true),
    });

  if (invite.isSuccess) {
    return (
      <>
        <BackButton label="Settings" onPress={onBack} />
        <ConfirmBanner>
          Invite sent to {invite.data.name}. They'll see a stability summary only, once accepted.
        </ConfirmBanner>
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
