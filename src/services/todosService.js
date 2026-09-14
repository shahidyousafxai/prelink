import { api } from './api';

export function fetchTodos() {
  return api.get('/todos', { params: { _limit: 5 } }).then((res) => res.data);
}
