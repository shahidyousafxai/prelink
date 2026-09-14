import { useQuery } from '@tanstack/react-query';

import { listTodosFn } from './todosFns';

// Resource-local query keys — unlike auth (cross-cutting, needed by the
// http.js interceptor), todos only matters here, so its keys stay local
// instead of living in the shared queryKeys object.
export const todosQueryKeys = {
  all: ['todos'],
};

export function useTodosQuery() {
  return useQuery({
    queryKey: todosQueryKeys.all,
    queryFn: listTodosFn,
  });
}
