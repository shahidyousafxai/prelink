import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import ConsentBlock from '../../../components/ConsentBlock';
import ToggleRow from '../../../components/shared/ToggleRow';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import TextLink from '../../../components/shared/TextLink';
import { useSetConsentStage } from '../../../network/consent/consentQueries';

// Stage 4 of 4 — the final gate, only asked because the user tapped
// "prepare a summary" on Insight. Client reframe (Scene 8): no contracted
// care team exists yet, so this is no longer live clinical escalation —
// it's an explicit summary-preparation step, leading to a preview before
// anything is saved, never a false hand-off claim.
export default function Consent4Screen({ navigation }) {
  const { t } = useTranslation();
  const { control, watch } = useForm({ defaultValues: { agree: false } });
  const agreed = watch('agree');
  const setConsentStage = useSetConsentStage();

  const handleAgree = () => {
    setConsentStage('s4', true);
    navigation.navigate('SummaryPreview');
  };

  return (
    <ScreenLayout center={false}>
      <ScreenHeader
        eyebrow={t('home.consent4.eyebrow')}
        badge={t('home.consent4.badge')}
        note={t('home.consent4.note')}
        headline={t('home.consent4.headline')}
        sub={t('home.consent4.sub')}
      />

      <ConsentBlock
        badge={t('home.consent4.stageBadge')}
        title={t('home.consent4.stageTitle')}
        description={t('home.consent4.stageDescription')}
      />

      <ToggleRow control={control} name="agree" label={t('home.consent4.agree')} />

      <PrimaryButton label={t('home.consent4.submit')} onPress={handleAgree} disabled={!agreed} />
      <TextLink label={t('common.notNow')} variant="muted" onPress={() => navigation.navigate('Insight')} />
    </ScreenLayout>
  );
}
