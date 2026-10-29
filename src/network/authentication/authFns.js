import { post } from '../http';
import { AUTH, ONBOARDING } from '../constant';

// Login/signup resolve to { token, user }; forgot/reset resolve to { message }.
export function loginFn(credentials) {
  return post(AUTH.LOGIN, credentials);
}

export function signupFn(credentials) {
  return post(AUTH.SIGNUP, credentials);
}

export function forgotPasswordFn(payload) {
  return post(AUTH.FORGOT_PASSWORD, payload);
}

export function resetPasswordFn(payload) {
  return post(AUTH.RESET_PASSWORD, payload);
}

export function completeOnboardingFn() {
  return post(ONBOARDING.COMPLETE);
}
