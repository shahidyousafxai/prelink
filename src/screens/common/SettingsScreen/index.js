import { View, Text, Pressable } from 'react-native';

import { useSessionQuery } from '../../../network/authentication/authQueries';
import { styles } from './styles';

// Common route: registered outside the auth check in RootNavigator, so it's
// reachable from both the public (signed-out) and protected (signed-in) stacks.
export default function SettingsScreen({ navigation }) {
  const { isAuthenticated } = useSessionQuery();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>
        {isAuthenticated ? 'Signed in' : 'Not signed in'} — this screen is reachable either way.
      </Text>

      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </View>
  );
}
