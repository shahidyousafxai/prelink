import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import ChipGroup from '../../../components/ChipGroup';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import BackButton from '../../../components/shared/BackButton';
import { useCompleteOnboardingMutation } from '../../../network/authentication/authQueries';
import { styles } from './styles';

// Form values stay pinned to the fixed English option strings (used as
// react-hook-form field values, not display text) so switching language
// mid-flow never invalidates an already-selected default; only the chip
// labels shown to the user are translated, via SLEEP_KEYS/CARE_KEYS below.
const SLEEP_KEYS = ['Good', 'Okay', 'Rough'];
const CARE_KEYS = ['Just me for now', 'A family member', 'A clinician already'];

export default function BaselineScreen({ navigation }) {
  const { t } = useTranslation();
  const completeOnboarding = useCompleteOnboardingMutation();
  const { control } = useForm({
    defaultValues: { sleep: 'Okay', care: 'Just me for now' },
  });

  const sleepLabels = t('onboarding.baseline.sleepOptions', { returnObjects: true });
  const careLabels = t('onboarding.baseline.careOptions', { returnObjects: true });

  return (
    <ScreenLayout center={false}>
      <BackButton label={t('common.back.consent')} onPress={() => navigation.goBack()} />
      <ScreenHeader
        eyebrow={t('onboarding.baseline.eyebrow')}
        headline={t('onboarding.baseline.headline')}
        sub={t('onboarding.baseline.sub')}
      />

      <ChipGroup
        control={control}
        name="sleep"
        label={t('onboarding.baseline.sleepLabel')}
        valueKeys={SLEEP_KEYS}
        options={sleepLabels}
      />
      <ChipGroup
        control={control}
        name="care"
        label={t('onboarding.baseline.careLabel')}
        valueKeys={CARE_KEYS}
        options={careLabels}
      />

      <View style={styles.spacer} />

      {/* Completing onboarding flips auth state; RootNavigator swaps to
          Home automatically, so no manual navigation call is needed here. */}
      <PrimaryButton
        label={t('onboarding.baseline.continue')}
        onPress={() => completeOnboarding.mutate()}
        loading={completeOnboarding.isPending}
      />
    </ScreenLayout>
  );
}
