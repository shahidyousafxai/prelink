import { useState } from 'react';
import { View, Text, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import FieldLabel from '../../../components/shared/FieldLabel';
import Card from '../../../components/shared/Card';
import AnimatedPressable from '../../../components/shared/AnimatedPressable';
import { colors } from '../../../theme/theme';
import { styles } from './styles';

// Matches the fixed order of home.calm.stressOptions: Calm / A little
// tense / Overwhelmed.
const STRESS_KEYS = ['Calm', 'Tense', 'Overwhelmed'];

// Calm is the one pillar the client upgraded rather than deferred — this is
// real, working content (a stress self-report + a real breathing exercise),
// not a placeholder like Heart/Weight. Lives in MyHealthStack (not
// RootNavigator) so the tab bar stays visible, matching the prototype's
// `with-tabs` class on this screen.
export default function CalmScreen({ navigation }) {
  const { t } = useTranslation();
  const [stress, setStress] = useState('Tense');
  const stressLabels = t('home.calm.stressOptions', { returnObjects: true });

  return (
    <ScreenLayout center={false} tabBarInset>
      <BackButton label={t('common.back.today')} onPress={() => navigation.navigate('Main', { screen: 'Today' })} />
      <ScreenHeader headline={t('home.calm.headline')} sub={t('home.calm.sub')} />

      <FieldLabel>{t('home.calm.stressLabel')}</FieldLabel>
      <View style={styles.stressRow}>
        {stressLabels.map((label, index) => {
          const key = STRESS_KEYS[index];
          const selected = stress === key;
          return (
            <AnimatedPressable
              key={key}
              style={[styles.stressChip, selected && styles.stressChipSelected]}
              onPress={() => setStress(key)}
              scaleTo={0.96}
            >
              <Text style={[styles.stressLabel, selected && styles.stressLabelSelected]}>{label}</Text>
            </AnimatedPressable>
          );
        })}
      </View>

      <Card style={styles.breatheCard} onPress={() => navigation.navigate('BreathingExercise')}>
        <View style={[styles.avatar, { backgroundColor: colors.ink }]}>
          <Ionicons name="leaf-outline" size={18} color={colors.white} />
        </View>
        <View style={styles.breatheText}>
          <Text style={styles.breatheTitle}>{t('home.calm.breatheTitle')}</Text>
          <Text style={styles.breatheBody}>{t('home.calm.breatheBody')}</Text>
        </View>
        <Ionicons
          name={I18nManager.isRTL ? 'chevron-back' : 'chevron-forward'}
          size={18}
          color={colors.inkSoft}
        />
      </Card>
    </ScreenLayout>
  );
}
