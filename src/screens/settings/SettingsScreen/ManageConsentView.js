import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import ToggleRow from '../../../components/shared/ToggleRow';
import { useConsentQuery, useSetConsentStage } from '../../../network/consent/consentQueries';

const STAGE_KEYS = ['s1', 's2', 's3', 's4'];

// Every stage you've granted anywhere in the app (e.g. Stage 2 from the
// Assessment Task flow) shows up here live, and can be turned off
// independently — this is the actual proof that consent isn't a one-time
// checkbox. Reads the same shared consent state as the rest of the app,
// not a private copy.
export default function ManageConsentView({ onBack }) {
  const { t } = useTranslation();
  const { data: consent } = useConsentQuery();
  const setConsentStage = useSetConsentStage();

  return (
    <>
      <BackButton label={t('common.back.settings')} onPress={onBack} />
      <ScreenHeader headline={t('settings.manageConsent.headline')} sub={t('settings.manageConsent.sub')} />
      {STAGE_KEYS.map((key) => (
        <ToggleRow
          key={key}
          label={t(`settings.manageConsent.stages.${key}`)}
          value={consent?.[key]}
          onValueChange={(value) => setConsentStage(key, value)}
        />
      ))}
    </>
  );
}
