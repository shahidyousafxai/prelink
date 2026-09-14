import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Mocked until a real auth endpoint exists — swap the body for
// `api.post('/auth/login', credentials).then((res) => res.data)`.
export function login(credentials) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email && credentials.password) {
        resolve({ token: 'demo-token' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}
