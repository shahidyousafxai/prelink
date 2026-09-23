import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import Banner from '../../../components/shared/Banner';
import Card from '../../../components/shared/Card';
import TrendLine from '../../../components/TrendLine';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import ConfirmBanner from '../../../components/shared/ConfirmBanner';
import { colors } from '../../../theme/theme';
import { styles } from './styles';

const TREND_PATH = 'M0,20 C60,25 100,45 160,42 C210,40 240,48 280,50';

// Severity and trend only, never a diagnostic label, until the clinician's
// own note introduces one — this is the human layer the whole architecture
// is gated around.
export default function ClinicianCaseScreen({ navigation }) {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  return (
    <ScreenLayout center={false}>
      <BackButton label={t('common.back.queue')} onPress={() => navigation.navigate('ClinicianQueue')} />
      <ScreenHeader headline={t('home.clinicianCase.headline')} />
      <Banner variant="governance">{t('home.clinicianCase.banner')}</Banner>

      <Card style={styles.card}>
        <TrendLine path={TREND_PATH} color={colors.clay} label={t('home.clinicianCase.trendLabel')} />
      </Card>

      {sent ? (
        <ConfirmBanner>{t('home.clinicianCase.referralSent')}</ConfirmBanner>
      ) : (
        <PrimaryButton label={t('home.clinicianCase.sendReferral')} onPress={() => setSent(true)} />
      )}
    </ScreenLayout>
  );
}
