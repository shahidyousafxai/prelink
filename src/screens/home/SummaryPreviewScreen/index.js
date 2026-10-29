import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import DataTable from '../../../components/shared/DataTable';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import TextLink from '../../../components/shared/TextLink';
import { styles } from './styles';

const ROW_KEYS = ['checkins', 'mindPattern', 'rawAnswers', 'recipient'];

// Client requirement (Scene 8): "A care request must identify the recipient
// and information to be sent. Show a preview and obtain explicit permission
// before sending." This screen didn't exist before that response — before
// anything is finalized, the person sees exactly what's included and who
// (if anyone) would receive it. Recipient honestly shows "None yet" rather
// than implying a clinician is standing by.
export default function SummaryPreviewScreen({ navigation }) {
  const { t } = useTranslation();
  const rows = ROW_KEYS.map((key) => ({
    key: t(`home.summaryPreview.rows.${key}`),
    value: t(`home.summaryPreview.rows.${key}Value`),
  }));

  return (
    <ScreenLayout center={false}>
      <ScreenHeader
        eyebrow={t('home.summaryPreview.eyebrow')}
        headline={t('home.summaryPreview.headline')}
        sub={t('home.summaryPreview.sub')}
      />
      <DataTable rows={rows} />
      <View style={styles.saveButton}>
        <PrimaryButton label={t('home.summaryPreview.save')} onPress={() => navigation.navigate('SummaryPrepared')} />
      </View>
      <TextLink label={t('home.summaryPreview.back')} onPress={() => navigation.goBack()} />
    </ScreenLayout>
  );
}
