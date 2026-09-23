export function getGreeting(t, date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return t('greeting.morning');
  if (hour < 18) return t('greeting.afternoon');
  return t('greeting.evening');
}
