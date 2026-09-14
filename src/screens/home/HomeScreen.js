import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';

import { useLogoutMutation } from '../../network/authentication/authQueries';
import { useTodosQuery } from '../../network/todos/todosQueries';
import { incrementVisitCount } from '../../utils/storage';

export default function HomeScreen({ navigation }) {
  const [visitCount, setVisitCount] = useState(null);
  const { data: todos, isLoading, isError, refetch, isRefetching } = useTodosQuery();
  const logout = useLogoutMutation();

  useEffect(() => {
    incrementVisitCount().then(setVisitCount);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Visits this session: {visitCount ?? '...'}</Text>

      {isLoading && <ActivityIndicator />}
      {isError && <Text style={styles.error}>Failed to load todos</Text>}

      <FlatList
        data={todos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Text style={styles.item}>• {item.title}</Text>}
        onRefresh={refetch}
        refreshing={isRefetching}
        style={styles.list}
      />

      <Pressable style={styles.button} onPress={() => logout.mutate()} disabled={logout.isPending}>
        <Text style={styles.buttonText}>{logout.isPending ? 'Logging out...' : 'Log out'}</Text>
      </Pressable>

      <Pressable style={styles.link} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.linkText}>Settings</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4, marginBottom: 16 },
  list: { flex: 1 },
  item: { fontSize: 15, paddingVertical: 6 },
  error: { color: '#d33', marginBottom: 12 },
  button: {
    backgroundColor: '#111',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { alignItems: 'center', marginTop: 20 },
  linkText: { color: '#2563eb', fontSize: 14, fontWeight: '500' },
});
