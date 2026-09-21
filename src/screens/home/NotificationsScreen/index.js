import { Text } from 'react-native';

import ScreenLayout from '../../../components/ScreenLayout';
import ScreenHeader from '../../../components/ScreenHeader';
import BackButton from '../../../components/BackButton';
import Card from '../../../components/Card';
import FutureRibbon from '../../../components/FutureRibbon';
import { styles } from './styles';

// Not a real in-app screen — there's no notifications-list UI. This exists
// purely to make the Behavior-change RULES doc's notification-copy examples
// visible, including the "shrink, not escalate" behavior over time: the
// three cards are three points in time for the same ignored prompt, not
// three separate notification types.
export default function NotificationsScreen({ navigation }) {
  return (
    <ScreenLayout center={false}>
      <BackButton label="Settings" onPress={() => navigation.navigate('Main', { screen: 'You' })} />
      <FutureRibbon label="NOT YET BUILT — SHOWN HERE FOR SHAPE ONLY" />
      <ScreenHeader
        headline="Contextual prompts (examples)"
        sub="Not a real screen — a preview of the notification copy the Behavior-change RULES doc describes. These trigger on state, not a fixed schedule, and shrink if ignored rather than escalate."
      />

      <Card style={styles.card}>
        <Text style={styles.time}>Today, 2:14 PM</Text>
        <Text style={styles.copy}>"This is a low-energy moment. Here's the easiest possible win."</Text>
      </Card>

      <Card style={[styles.card, styles.faded]}>
        <Text style={styles.time}>3 days later (ignored once)</Text>
        <Text style={styles.copy}>
          "No pressure — here whenever you'd like." <Text style={styles.italic}>(quieter, not repeated louder)</Text>
        </Text>
      </Card>

      <Card>
        <Text style={styles.time}>After 3 weeks away</Text>
        <Text style={styles.copy}>"We saved your place. Today's step takes 20 seconds."</Text>
      </Card>
    </ScreenLayout>
  );
}
