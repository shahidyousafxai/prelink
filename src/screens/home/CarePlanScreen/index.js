import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import Card from '../../../components/shared/Card';
import SecondaryButton from '../../../components/shared/SecondaryButton';
import { styles } from './styles';

// Every suggestion follows the same three-step structure: normalize, offer
// a choice, then the lowest-effort option — never "should"/"recommended".
export default function CarePlanScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <ScreenLayout center={false}>
      <ScreenHeader
        eyebrow={t('home.carePlan.eyebrow')}
        headline={t('home.carePlan.headline')}
        sub={t('home.carePlan.sub')}
      />

      <Card style={styles.card}>
        <Text style={styles.title}>{t('home.carePlan.walkTitle')}</Text>
        <Text style={styles.body}>{t('home.carePlan.walkBody')}</Text>
        <SecondaryButton label={t('home.carePlan.walkButton')} onPress={() => navigation.navigate('CheckIn')} />
      </Card>

      <Card>
        <Text style={styles.title}>{t('home.carePlan.connectTitle')}</Text>
        <Text style={styles.bodyLast}>{t('home.carePlan.connectBody')}</Text>
      </Card>
    </ScreenLayout>
  );
}
