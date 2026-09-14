import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';

import { useLogoutMutation } from '../../../network/authentication/authQueries';
import { useTodosQuery } from '../../../network/todos/todosQueries';
import { incrementVisitCount } from '../../../utils/storage';
import { styles } from './styles';

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
