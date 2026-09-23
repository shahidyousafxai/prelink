import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import Banner from '../../../components/shared/Banner';
import SectionTitle from '../../../components/shared/SectionTitle';
import DataTable from '../../../components/shared/DataTable';
import { styles } from './styles';

const ROW_KEYS = ['cognitiveSignals', 'longitudinalTrends', 'caregiverViews', 'clinicianViews'];

export default function AboutView({ onBack }) {
  const { t } = useTranslation();
  const rows = ROW_KEYS.map((key) => ({
    key: t(`settings.about.rows.${key}`),
    value: t(`settings.about.rows.${key}Value`),
  }));

  return (
    <>
      <BackButton label={t('common.back.settings')} onPress={onBack} />
      <ScreenHeader headline={t('settings.about.headline')} />
      <Banner>{t('settings.about.banner')}</Banner>
      <SectionTitle>{t('settings.about.sectionTitle')}</SectionTitle>
      <DataTable rows={rows} />
      <Text style={styles.footnote}>{t('settings.about.footnote')}</Text>
    </>
  );
}
