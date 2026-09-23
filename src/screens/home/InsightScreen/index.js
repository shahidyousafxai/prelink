import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import SectionLabel from '../../../components/shared/SectionLabel';
import SecondaryButton from '../../../components/shared/SecondaryButton';
import TextLink from '../../../components/shared/TextLink';
import { useConsentQuery } from '../../../network/consent/consentQueries';
import { styles } from './styles';

// The highest-regulatory-risk screen in the app: no score, no chart, no
// disease name, ever. Escalation is user-initiated and optional — the app
// never pushes it.
export default function InsightScreen({ navigation }) {
  const { t } = useTranslation();
  const { data: consent } = useConsentQuery();

  const handleEscalate = () => {
    navigation.navigate(consent?.s4 ? 'EscalationSent' : 'Consent4');
  };

  return (
    <ScreenLayout center={false}>
      <View style={styles.icon}>
        <Ionicons name="contrast-outline" size={20} color="#7A5A1E" />
      </View>
      <Text style={styles.headline}>{t('home.insight.headline')}</Text>
      <View style={styles.body}>
        <Text style={styles.bodyText}>{t('home.insight.body')}</Text>
      </View>

      <SectionLabel>{t('home.insight.helpsLabel')}</SectionLabel>
      <View style={styles.helpsCard}>
        <Text style={styles.helpsTitle}>{t('home.insight.helpsTitle')}</Text>
        <Text style={styles.helpsBody}>{t('home.insight.helpsBody')}</Text>
      </View>

      <SecondaryButton label={t('home.insight.escalate')} onPress={handleEscalate} />
      <TextLink
        label={t('common.notNow')}
        variant="muted"
        onPress={() => navigation.navigate('Main', { screen: 'Today' })}
      />
    </ScreenLayout>
  );
}
