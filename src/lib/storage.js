import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const AUTH_TOKEN_KEY = 'auth_token';
const VISIT_COUNT_KEY = 'visit_count';

export function saveAuthToken(token) {
  return SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
}

export function getAuthToken() {
  return SecureStore.getItemAsync(AUTH_TOKEN_KEY);
}

export function clearAuthToken() {
  return SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}

export async function getVisitCount() {
  const value = await AsyncStorage.getItem(VISIT_COUNT_KEY);
  return value ? parseInt(value, 10) : 0;
}

export async function incrementVisitCount() {
  const count = (await getVisitCount()) + 1;
  await AsyncStorage.setItem(VISIT_COUNT_KEY, String(count));
  return count;
}
