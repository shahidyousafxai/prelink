import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ConfirmCheck from '../../../components/shared/ConfirmCheck';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import { styles } from './styles';

// Confirms the handoff without implying urgency or a verdict. From here the
// case sits in a clinician's queue, not an algorithm's.
export default function EscalationSentScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <ScreenLayout>
      <ConfirmCheck />
      <Text style={styles.headline}>{t('home.escalationSent.headline')}</Text>
      <Text style={styles.sub}>{t('home.escalationSent.sub')}</Text>
      <PrimaryButton label={t('common.done')} onPress={() => navigation.navigate('Main', { screen: 'Today' })} />
    </ScreenLayout>
  );
}
