import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import Banner from '../../../components/shared/Banner';
import FlagRow from '../../../components/FlagRow';
import { useConsentQuery } from '../../../network/consent/consentQueries';
import { styles } from './styles';

// Mona only appears here, flagged, after Stage 4 consent was actually
// granted on the patient side — this list reflects the shared consent
// state, it isn't hardcoded.
export default function ClinicianQueueScreen({ navigation }) {
  const { t } = useTranslation();
  const { data: consent } = useConsentQuery();

  return (
    <ScreenLayout center={false}>
      <BackButton label={t('common.back.settings')} onPress={() => navigation.navigate('Main', { screen: 'You' })} />
      <ScreenHeader eyebrow={t('home.clinicianQueue.eyebrow')} headline={t('home.clinicianQueue.headline')} />
      <Banner variant="governance">{t('home.clinicianQueue.banner')}</Banner>

      {consent?.s4 && (
        <FlagRow
          name="Mona K."
          sub={t('home.clinicianQueue.monaSub')}
          flagLabel={t('home.clinicianQueue.monaFlag')}
          flagVariant="gold"
          onPress={() => navigation.navigate('ClinicianCase')}
        />
      )}
      <FlagRow
        name="Samir H."
        sub={t('home.clinicianQueue.samirSub')}
        flagLabel={t('home.clinicianQueue.stableFlag')}
        flagVariant="pine"
      />
      <FlagRow
        name="Layla A."
        sub={t('home.clinicianQueue.laylaSub')}
        flagLabel={t('home.clinicianQueue.stableFlag')}
        flagVariant="pine"
      />

      {!consent?.s4 && <Text style={styles.note}>{t('home.clinicianQueue.noEscalations')}</Text>}
    </ScreenLayout>
  );
}
