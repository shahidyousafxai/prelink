import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import OnboardingWizardLayout from '../../../components/OnboardingWizardLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import ConsentBlock from '../../../components/ConsentBlock';
import ToggleRow from '../../../components/shared/ToggleRow';

// Stage 1 of 4 — the only consent required to use PreLink at all. The other
// three stages (pattern awareness, caregiver sharing, clinical escalation)
// are shown later, contextually, not as part of onboarding. The "Consent 1
// of 4" badge below is that separate, app-wide consent system — unrelated
// to this wizard's own step 2-of-3 progress bar.
export default function ConsentScreen({ navigation }) {
  const { t } = useTranslation();
  const { control, watch } = useForm({ defaultValues: { agree: false } });
  const agreed = watch('agree');

  return (
    <OnboardingWizardLayout
      step={2}
      totalSteps={3}
      backLabel={t('common.back.language')}
      onBack={() => navigation.goBack()}
      primaryLabel={t('onboarding.consent.continue')}
      onPrimaryPress={() => navigation.navigate('OnboardingBaseline')}
      primaryDisabled={!agreed}
    >
      <ScreenHeader
        eyebrow={t('onboarding.consent.eyebrow')}
        badge={t('onboarding.consent.badge')}
        note={t('onboarding.consent.note')}
        headline={t('onboarding.consent.headline')}
        sub={t('onboarding.consent.sub')}
      />

      <ConsentBlock
        badge={t('onboarding.consent.stage1Badge')}
        title={t('onboarding.consent.stage1Title')}
        description={t('onboarding.consent.stage1Description')}
      />
      <ConsentBlock
        title={t('onboarding.consent.laterTitle')}
        description={t('onboarding.consent.laterDescription')}
        dimmed
      />

      <ToggleRow control={control} name="agree" label={t('onboarding.consent.agree')} />
    </OnboardingWizardLayout>
  );
}
