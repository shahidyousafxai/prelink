import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import Card from '../../../components/shared/Card';
import SecondaryButton from '../../../components/shared/SecondaryButton';
import { colors } from '../../../theme/theme';
import { styles } from './styles';

// Every suggestion follows the same three-step structure: normalize, offer
// a choice, then the lowest-effort option — never "should"/"recommended".
// The actionable card (has a button) gets a tinted background + colored
// edge, matching Mind's task card, so it reads as the one thing to do;
// the passive info card stays plain — same pattern as the Mind page.
export default function CarePlanScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <ScreenLayout center={false} tabBarInset>
      <ScreenHeader headline={t('home.carePlan.headline')} sub={t('home.carePlan.sub')} />

      <Card style={[styles.card, styles.actionCard]}>
        <View style={styles.headerRow}>
          <View style={[styles.avatar, { backgroundColor: colors.gold }]}>
            <Ionicons name="walk-outline" size={18} color={colors.white} />
          </View>
          <Text style={styles.title}>{t('home.carePlan.walkTitle')}</Text>
        </View>
        <SecondaryButton label={t('home.carePlan.walkButton')} onPress={() => navigation.navigate('CheckIn')} />
      </Card>

      <Card>
        <View style={styles.headerRow}>
          <View style={[styles.avatar, { backgroundColor: colors.clay }]}>
            <Ionicons name="call-outline" size={18} color={colors.white} />
          </View>
          <Text style={styles.title}>{t('home.carePlan.connectTitle')}</Text>
        </View>
        <Text style={styles.bodyLast}>{t('home.carePlan.connectBody')}</Text>
      </Card>
    </ScreenLayout>
  );
}
