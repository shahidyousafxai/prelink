import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import TextField from '../../../components/shared/TextField';
import ToggleRow from '../../../components/shared/ToggleRow';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import FormError from '../../../components/shared/FormError';
import ConfirmBanner from '../../../components/shared/ConfirmBanner';
import { getInviteCaregiverSchema } from '../../../validations/inviteCaregiver';
import { useInviteCaregiverMutation } from '../../../network/caregiver/caregiverQueries';
import { useSetConsentStage } from '../../../network/consent/consentQueries';

// This screen is simultaneously the invite flow and the Stage 3 consent
// screen — sharing only becomes possible once both the invite and the
// toggle happen together. Sending the invite is what unlocks the Caregiver
// Home preview (Settings → Preview: Caregiver view).
export default function InviteCaregiverView({ onBack }) {
  const { t } = useTranslation();
  const invite = useInviteCaregiverMutation();
  const setConsentStage = useSetConsentStage();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(useMemo(() => getInviteCaregiverSchema(t), [t])),
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
        <BackButton label={t('common.back.settings')} onPress={onBack} />
        <ConfirmBanner>{t('settings.inviteCaregiver.success', { name: invite.data.name })}</ConfirmBanner>
        <PrimaryButton label={t('settings.inviteCaregiver.done')} onPress={onBack} />
      </>
    );
  }

  return (
    <>
      <BackButton label={t('common.back.settings')} onPress={onBack} />
      <ScreenHeader
        eyebrow={t('settings.inviteCaregiver.eyebrow')}
        headline={t('settings.inviteCaregiver.headline')}
        sub={t('settings.inviteCaregiver.sub')}
      />
      <TextField
        control={control}
        name="name"
        label={t('settings.inviteCaregiver.nameLabel')}
        placeholder={t('settings.inviteCaregiver.namePlaceholder')}
        error={errors.name?.message}
      />
      <ToggleRow control={control} name="share" label={t('settings.inviteCaregiver.shareLabel')} />
      <FormError message={invite.isError ? invite.error.message : null} />
      <PrimaryButton
        label={t('settings.inviteCaregiver.submit')}
        onPress={handleSubmit(onSubmit)}
        disabled={!share}
        loading={invite.isPending}
      />
    </>
  );
}
