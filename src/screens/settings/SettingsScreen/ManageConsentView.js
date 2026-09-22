import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import ToggleRow from '../../../components/shared/ToggleRow';
import { useConsentQuery, useSetConsentStage } from '../../../network/consent/consentQueries';

const STAGES = [
  { key: 's1', label: 'Wellness support' },
  { key: 's2', label: 'Pattern awareness' },
  { key: 's3', label: 'Caregiver sharing' },
  { key: 's4', label: 'Clinical escalation' },
];

// Every stage you've granted anywhere in the app (e.g. Stage 2 from the
// Assessment Task flow) shows up here live, and can be turned off
// independently — this is the actual proof that consent isn't a one-time
// checkbox. Reads the same shared consent state as the rest of the app,
// not a private copy.
export default function ManageConsentView({ onBack }) {
  const { data: consent } = useConsentQuery();
  const setConsentStage = useSetConsentStage();

  return (
    <>
      <BackButton label="Settings" onPress={onBack} />
      <ScreenHeader
        headline="Manage consent"
        sub="Each stage is independent and revocable — turning one off never affects the others."
      />
      {STAGES.map((stage) => (
        <ToggleRow
          key={stage.key}
          label={stage.label}
          value={consent?.[stage.key]}
          onValueChange={(value) => setConsentStage(stage.key, value)}
        />
      ))}
    </>
  );
}
