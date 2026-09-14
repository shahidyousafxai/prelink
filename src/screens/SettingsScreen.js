import { View, Text, Pressable, StyleSheet } from 'react-native';

import { useSession } from '../hooks/useSession';

// Common route: registered outside the auth check in RootNavigator, so it's
// reachable from both the public (signed-out) and protected (signed-in) stacks.
export default function SettingsScreen({ navigation }) {
  const { isAuthenticated } = useSession();

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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '600', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 24 },
  button: {
    backgroundColor: '#111',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
