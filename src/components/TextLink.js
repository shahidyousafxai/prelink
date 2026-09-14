import { Pressable, Text, StyleSheet } from 'react-native';

import { colors, fonts } from '../theme/theme';

// `variant="accent"` (default) matches the prototype's pine link color used
// for primary navigation (e.g. lang-btn.sel border, active states).
// `variant="muted"` matches `.btn-text` — the de-emphasized, underlined
// secondary action style (e.g. "Not now").
export default function TextLink({ label, onPress, variant = 'accent' }) {
  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      <Text style={[styles.label, variant === 'muted' && styles.muted]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginTop: 14 },
  label: { fontSize: 13.5, fontFamily: fonts.bodySemiBold, color: colors.pine },
  muted: { color: colors.inkSoft, fontSize: 13, textDecorationLine: 'underline' },
});
