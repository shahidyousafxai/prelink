import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import Banner from '../../../components/shared/Banner';
import SectionTitle from '../../../components/shared/SectionTitle';
import DataTable from '../../../components/shared/DataTable';
import { colors } from '../../../theme/theme';
import { styles } from './styles';

const ROWS_META = [
  { key: 'cognitiveSignals', icon: 'bulb-outline', accent: colors.pine },
  { key: 'longitudinalTrends', icon: 'trending-up-outline', accent: colors.gold },
  { key: 'caregiverViews', icon: 'people-outline', accent: colors.clay },
  { key: 'clinicianViews', icon: 'medkit-outline', accent: colors.ink },
];

export default function AboutView({ navigation }) {
  const { t } = useTranslation();
  const rows = ROWS_META.map(({ key, icon, accent }) => ({
    key: t(`settings.about.rows.${key}`),
    value: t(`settings.about.rows.${key}Value`),
    icon,
    accent,
  }));

  return (
    <ScreenLayout center={false} tabBarInset>
      <BackButton label={t('common.back.settings')} onPress={() => navigation.goBack()} />
      <ScreenHeader headline={t('settings.about.headline')} />
      <Banner>{t('settings.about.banner')}</Banner>
      <SectionTitle>{t('settings.about.sectionTitle')}</SectionTitle>
      <DataTable rows={rows} />
      <Text style={styles.footnote}>{t('settings.about.footnote')}</Text>
    </ScreenLayout>
  );
}
