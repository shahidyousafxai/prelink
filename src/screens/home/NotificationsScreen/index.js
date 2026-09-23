import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import Card from '../../../components/shared/Card';
import FutureRibbon from '../../../components/FutureRibbon';
import { styles } from './styles';

// Not a real in-app screen — there's no notifications-list UI. This exists
// purely to make the Behavior-change RULES doc's notification-copy examples
// visible, including the "shrink, not escalate" behavior over time: the
// three cards are three points in time for the same ignored prompt, not
// three separate notification types.
export default function NotificationsScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <ScreenLayout center={false}>
      <BackButton label={t('common.back.settings')} onPress={() => navigation.navigate('Main', { screen: 'You' })} />
      <FutureRibbon label={t('home.notifications.ribbon')} />
      <ScreenHeader headline={t('home.notifications.headline')} sub={t('home.notifications.sub')} />

      <Card style={styles.card}>
        <Text style={styles.time}>{t('home.notifications.example1Time')}</Text>
        <Text style={styles.copy}>{t('home.notifications.example1Copy')}</Text>
      </Card>

      <Card style={[styles.card, styles.faded]}>
        <Text style={styles.time}>{t('home.notifications.example2Time')}</Text>
        <Text style={styles.copy}>
          {t('home.notifications.example2Copy')} <Text style={styles.italic}>{t('home.notifications.example2Note')}</Text>
        </Text>
      </Card>

      <Card>
        <Text style={styles.time}>{t('home.notifications.example3Time')}</Text>
        <Text style={styles.copy}>{t('home.notifications.example3Copy')}</Text>
      </Card>
    </ScreenLayout>
  );
}
