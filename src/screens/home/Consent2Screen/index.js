import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        eyebrow={t('home.consent2.eyebrow')}
        badge={t('home.consent2.badge')}
        note={t('home.consent2.note')}
        headline={t('home.consent2.headline')}
        sub={t('home.consent2.sub')}
      />

      <ConsentBlock
        badge={t('home.consent2.stageBadge')}
        title={t('home.consent2.stageTitle')}
        description={t('home.consent2.stageDescription')}
      />

      <ToggleRow control={control} name="agree" label={t('home.consent2.agree')} />

      <PrimaryButton label={t('home.consent2.submit')} onPress={handleAgree} disabled={!agreed} />
      <TextLink
        label={t('common.notNow')}
        variant="muted"
        onPress={() => navigation.navigate('Main', { screen: 'MyHealth' })}
      />
    </ScreenLayout>
  );
}
