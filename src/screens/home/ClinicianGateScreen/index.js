import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import BackButton from '../../../components/shared/BackButton';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import { styles } from './styles';

// A deliberately unglamorous gate — clinicians don't casually browse into
// this, they sign in through credentialed, logged access. Reached via
// Settings → Preview: Clinician portal (this app doesn't implement a real
// separate clinician login).
export default function ClinicianGateScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <ScreenLayout center={false}>
      <BackButton label={t('common.back.settings')} onPress={() => navigation.navigate('Main', { screen: 'You' })} />
      <View style={styles.centerFlow}>
        <Text style={styles.eyebrow}>{t('home.clinicianGate.eyebrow')}</Text>
        <Text style={styles.headline}>{t('home.clinicianGate.headline')}</Text>
        <Text style={styles.sub}>{t('home.clinicianGate.sub')}</Text>
        <PrimaryButton label={t('home.clinicianGate.enter')} onPress={() => navigation.navigate('ClinicianQueue')} />
      </View>
    </ScreenLayout>
  );
}
