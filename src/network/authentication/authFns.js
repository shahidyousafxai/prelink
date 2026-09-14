// Mocked until real auth endpoints exist — swap each body for the matching
// http helper call (e.g. `post(AUTH.LOGIN, credentials)` from `../http`)
// once a backend is available. Endpoint paths already live in
// `network/constant.js`.
export function loginFn(credentials) {
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

export function signupFn(credentials) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ token: 'demo-token' }), 500);
  });
}

export function forgotPasswordFn(payload) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ message: 'Reset link sent' }), 500);
  });
}
