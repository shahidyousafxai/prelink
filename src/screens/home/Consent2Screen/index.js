import { useForm } from 'react-hook-form';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import ConsentBlock from '../../../components/ConsentBlock';
import ToggleRow from '../../../components/shared/ToggleRow';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import TextLink from '../../../components/shared/TextLink';
import { useSetConsentStage } from '../../../network/consent/consentQueries';

// Stage 2 of 4 — appears the first time the app would show a trend or
// insight, not upfront during onboarding; consent is contextual to the
// moment it actually matters. Declining returns to Mind quietly — the task
// result is still logged, just not interpreted for the user.
export default function Consent2Screen({ navigation }) {
  const { control, watch } = useForm({ defaultValues: { agree: false } });
  const agreed = watch('agree');
  const setConsentStage = useSetConsentStage();

  const handleAgree = () => {
    setConsentStage('s2', true);
    navigation.navigate('Insight');
  };

  return (
    <ScreenLayout center={false}>
      <ScreenHeader
        eyebrow="Before we show a pattern"
        badge="Consent 2 of 4"
        note="Appearing now because it's actually relevant, not on a fixed schedule."
        headline="Pattern awareness"
        sub="This stage lets PreLink show you non-diagnostic trends from what you've logged. You can turn this off anytime in Settings."
      />

      <ConsentBlock
        badge="This stage"
        title="Directional trends only"
        description="No scores, no risk language, no thresholds. Just gentle, plain-language observations."
      />

      <ToggleRow control={control} name="agree" label="I understand and agree" />

      <PrimaryButton label="Agree & continue" onPress={handleAgree} disabled={!agreed} />
      <TextLink
        label="Not now"
        variant="muted"
        onPress={() => navigation.navigate('Main', { screen: 'MyHealth' })}
      />
    </ScreenLayout>
  );
}
