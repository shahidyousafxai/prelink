import { useState } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import BackButton from '../../../components/shared/BackButton';
import Chip from '../../../components/shared/Chip';
import ConfirmCheck from '../../../components/shared/ConfirmCheck';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import { useConsentQuery } from '../../../network/consent/consentQueries';
import { styles } from './styles';

// A placeholder for the actual sandbox task — the real content is
// proprietary vendor IP. Completion is outcome-agnostic and never reveals
// whether an answer was "correct".
export default function AssessmentTaskScreen({ navigation }) {
  const { t } = useTranslation();
  const { data: consent } = useConsentQuery();
  const [selected, setSelected] = useState(null);
  const words = t('home.assessmentTask.words', { returnObjects: true });

  const handleContinue = () => {
    navigation.navigate(consent?.s2 ? 'Insight' : 'Consent2');
  };

  return (
    <ScreenLayout center={false}>
      <BackButton
        label={t('common.back.backToMind')}
        onPress={() => navigation.navigate('Main', { screen: 'MyHealth' })}
      />
      <Text style={styles.progress}>{t('home.assessmentTask.progress')}</Text>

      <View style={styles.centerFlow}>
        {selected ? (
          <>
            <ConfirmCheck />
            <Text style={styles.doneTitle}>{t('home.assessmentTask.doneTitle')}</Text>
            <Text style={styles.doneSub}>{t('home.assessmentTask.doneSub')}</Text>
            <PrimaryButton label={t('home.assessmentTask.continue')} onPress={handleContinue} />
          </>
        ) : (
          <>
            <Text style={styles.headline}>{t('home.assessmentTask.headline')}</Text>
            <Text style={styles.sub}>{t('home.assessmentTask.sub')}</Text>
            <View style={styles.wordGrid}>
              {words.map((word) => (
                <Chip key={word} label={word} variant="grid" onPress={() => setSelected(word)} />
              ))}
            </View>
          </>
        )}
      </View>
    </ScreenLayout>
  );
}
