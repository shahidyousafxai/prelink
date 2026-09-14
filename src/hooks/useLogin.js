import { useMutation } from '@tanstack/react-query';

import { login } from '../services/authService';
import { saveAuthToken } from '../utils/storage';

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => saveAuthToken(data.token),
  });
}
