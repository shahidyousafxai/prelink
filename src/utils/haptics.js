import * as Haptics from 'expo-haptics';

// expo-haptics resolves its native module lazily and throws a normal,
// catchable UnavailabilityError from impactAsync() itself when it's missing
// (e.g. before the next EAS/dev-client rebuild) — swallowed here so tap
// feedback never crashes the app in the meantime.
export function tapFeedback() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}
