import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import LockRibbon from '../../../components/LockRibbon';
import NeutralCard from '../../../components/NeutralCard';
import SecondaryButton from '../../../components/shared/SecondaryButton';
import TextLink from '../../../components/shared/TextLink';
import { useConsentQuery } from '../../../network/consent/consentQueries';
import { styles } from './styles';

// Client requirement (Scene 7): "Hold automated change messages until the
// clinical lead approves a written interpretation protocol... Replace the
// proposed reassurance 'This is common, and often modifiable' unless
// supported." The auto-generated gentle note is gone — this is an honest
// "no interpretation available" state, plus a neutral route to a real
// person that works regardless of what this screen ever says (the client's
// own instruction: "provide a neutral route to seek professional help
// regardless of the badge").
export default function InsightScreen({ navigation }) {
  const { t } = useTranslation();
  const { data: consent } = useConsentQuery();

  const handlePrepareSummary = () => {
    navigation.navigate(consent?.s4 ? 'SummaryPreview' : 'Consent4');
  };

  return (
    <ScreenLayout center={false}>
      <LockRibbon label={t('home.insight.lockRibbon')} />
      <Text style={styles.headline}>{t('home.insight.headline')}</Text>
      <NeutralCard>{t('home.insight.neutralMessage')}</NeutralCard>
      <Text style={styles.sub}>{t('home.insight.sub')}</Text>

      <SecondaryButton label={t('home.insight.prepareSummary')} onPress={handlePrepareSummary} />
      <TextLink
        label={t('common.notNow')}
        variant="muted"
        onPress={() => navigation.navigate('Main', { screen: 'Today' })}
      />
    </ScreenLayout>
  );
}
