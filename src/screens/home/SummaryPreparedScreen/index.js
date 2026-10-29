import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ConfirmCheck from '../../../components/shared/ConfirmCheck';
import Badge from '../../../components/shared/Badge';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import { styles } from './styles';

// Client reframe (Scene 8): this no longer claims a clinician was notified,
// since none exists yet in this pilot. It shows an honest status — saved,
// no connected partner — and explains this is exactly where a real
// hand-off would happen once a partner is contracted. Replaces the old
// "Escalation Sent" screen, which implied a live clinical hand-off that
// doesn't exist.
export default function SummaryPreparedScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <ScreenLayout>
      <ConfirmCheck />
      <Text style={styles.headline}>{t('home.summaryPrepared.headline')}</Text>
      <View style={styles.badgeWrap}>
        <Badge label={t('home.summaryPrepared.status')} />
      </View>
      <Text style={styles.sub}>{t('home.summaryPrepared.sub')}</Text>
      <PrimaryButton label={t('common.done')} onPress={() => navigation.navigate('Main', { screen: 'Today' })} />
    </ScreenLayout>
  );
}
