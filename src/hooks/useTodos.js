import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../services/queryKeys';
import { fetchTodos } from '../services/todosService';

export function useTodos() {
  return useQuery({
    queryKey: queryKeys.todos.all,
    queryFn: fetchTodos,
  });
}
