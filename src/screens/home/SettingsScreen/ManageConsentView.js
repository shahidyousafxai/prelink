import { useState } from 'react';

import ScreenHeader from '../../../components/ScreenHeader';
import BackButton from '../../../components/BackButton';
import ToggleRow from '../../../components/ToggleRow';

const STAGES = [
  { key: 'wellness', label: 'Wellness support' },
  { key: 'pattern', label: 'Pattern awareness' },
  { key: 'caregiver', label: 'Caregiver sharing' },
  { key: 'clinical', label: 'Clinical escalation' },
];

// Every stage is independent and revocable — turning one off never affects
// the others. Session-only state here, matching the prototype's own
// in-memory (not persisted) consent object.
export default function ManageConsentView({ onBack }) {
  const [stages, setStages] = useState({ wellness: true, pattern: false, caregiver: false, clinical: false });

  const toggleStage = (key) => setStages((prev) => ({ ...prev, [key]: !prev[key] }));

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
          value={stages[stage.key]}
          onValueChange={() => toggleStage(stage.key)}
        />
      ))}
    </>
  );
}
