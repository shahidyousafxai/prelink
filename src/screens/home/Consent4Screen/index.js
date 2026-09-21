import { useForm } from 'react-hook-form';

import ScreenLayout from '../../../components/ScreenLayout';
import ScreenHeader from '../../../components/ScreenHeader';
import ConsentBlock from '../../../components/ConsentBlock';
import ToggleRow from '../../../components/ToggleRow';
import PrimaryButton from '../../../components/PrimaryButton';
import TextLink from '../../../components/TextLink';
import { useSetConsentStage } from '../../../network/consent/consentQueries';

// Stage 4 of 4 — the final and most consequential gate, only asked because
// the user tapped "talk to your care team" on Insight. Granting it is what
// causes the case to appear in the Clinician Queue. "No automated 'you may
// have X' outputs" is enforced by keeping this a human handoff, not an AI
// verdict.
export default function Consent4Screen({ navigation }) {
  const { control, watch } = useForm({ defaultValues: { agree: false } });
  const agreed = watch('agree');
  const setConsentStage = useSetConsentStage();

  const handleAgree = () => {
    setConsentStage('s4', true);
    navigation.navigate('EscalationSent');
  };

  return (
    <ScreenLayout center={false}>
      <ScreenHeader
        eyebrow="Before we reach out"
        badge="Consent 4 of 4"
        note='The last of the 4 — only asked because you tapped "talk to your care team."'
        headline="Clinical escalation"
        sub="This shares your recent pattern (never raw scores) with a licensed clinician on your care team, only after you say so."
      />

      <ConsentBlock
        badge="This stage"
        title="Explicit medical handoff"
        description='A clinician — not PreLink — takes it from here. No automated "you may have X" outputs, ever.'
      />

      <ToggleRow control={control} name="agree" label="I understand and agree" />

      <PrimaryButton label="Agree & send" onPress={handleAgree} disabled={!agreed} />
      <TextLink label="Not now" variant="muted" onPress={() => navigation.navigate('Insight')} />
    </ScreenLayout>
  );
}
