import { View } from 'react-native';
import { useForm } from 'react-hook-form';

import ScreenLayout from '../../../components/ScreenLayout';
import ScreenHeader from '../../../components/ScreenHeader';
import ChipGroup from '../../../components/ChipGroup';
import PrimaryButton from '../../../components/PrimaryButton';
import { useCompleteOnboardingMutation } from '../../../network/authentication/authQueries';
import { styles } from './styles';

export default function BaselineScreen() {
  const completeOnboarding = useCompleteOnboardingMutation();
  const { control } = useForm({
    defaultValues: { sleep: 'Okay', care: 'Just me for now' },
  });

  return (
    <ScreenLayout center={false}>
      <ScreenHeader
        eyebrow="Last onboarding step · A little about you"
        headline="Getting your starting point"
        sub="This helps PreLink meet you where you are from day one — nothing here is medical information."
      />

      <ChipGroup
        control={control}
        name="sleep"
        label="How's sleep been lately?"
        options={['Good', 'Okay', 'Rough']}
      />
      <ChipGroup
        control={control}
        name="care"
        label="Anyone helping with day-to-day things?"
        options={['Just me for now', 'A family member', 'A clinician already']}
      />

      <View style={styles.spacer} />

      {/* Completing onboarding flips auth state; RootNavigator swaps to
          Home automatically, so no manual navigation call is needed here. */}
      <PrimaryButton
        label="Continue"
        onPress={() => completeOnboarding.mutate()}
        loading={completeOnboarding.isPending}
      />
    </ScreenLayout>
  );
}
