import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import ConsentBlock from '../../../components/ConsentBlock';
import ToggleRow from '../../../components/shared/ToggleRow';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import BackButton from '../../../components/shared/BackButton';
import { styles } from './styles';

// Stage 1 of 4 — the only consent required to use PreLink at all. The other
// three stages (pattern awareness, caregiver sharing, clinical escalation)
// are shown later, contextually, not as part of onboarding.
export default function ConsentScreen({ navigation }) {
  const { t } = useTranslation();
  const { control, watch } = useForm({ defaultValues: { agree: false } });
  const agreed = watch('agree');

  return (
    <ScreenLayout center={false}>
      <BackButton label={t('common.back.language')} onPress={() => navigation.goBack()} />
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

      <View style={styles.spacer} />

      <ToggleRow control={control} name="agree" label={t('onboarding.consent.agree')} />

      <PrimaryButton
        label={t('onboarding.consent.continue')}
        onPress={() => navigation.navigate('OnboardingBaseline')}
        disabled={!agreed}
      />
    </ScreenLayout>
  );
}
