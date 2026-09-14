import { get } from '../http';
import { TODOS } from '../constant';

export function listTodosFn() {
  return get(TODOS.BASE, { params: { _limit: 5 } });
}
