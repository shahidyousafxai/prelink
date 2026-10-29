import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ScreenLayout from '../shared/ScreenLayout';
import BackButton from '../shared/BackButton';
import { colors } from '../../theme/theme';
import { styles } from './styles';

// Matches the prototype's honest "isn't available yet" treatment for
// Heart/Weight — replacing the old dressed-up copy of Mind's template
// (trend line, fake task card) that the client called out as misleading.
// No `with-tabs` in the prototype markup, so this is a focused, full-screen
// flow with the tab bar hidden, same as CheckIn/AssessmentTask.
export default function UnavailablePillarScreen({ headline, sub, backLabel, onBack }) {
  return (
    <ScreenLayout center={false}>
      <BackButton label={backLabel} onPress={onBack} />
      <View style={styles.centerFlow}>
        <Ionicons name="hourglass-outline" size={30} color={colors.inkSoft} style={styles.icon} />
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>
    </ScreenLayout>
  );
}
