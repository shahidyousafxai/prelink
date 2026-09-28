import { Text, StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';
import AnimatedPressable from '../AnimatedPressable';

// `variant="accent"` (default) matches the prototype's pine link color used
// for primary navigation (e.g. lang-btn.sel border, active states).
// `variant="muted"` matches `.btn-text` — the de-emphasized, underlined
// secondary action style (e.g. "Not now").
// `variant="danger"` matches `.danger-link` (e.g. "Delete my data").
export default function TextLink({ label, onPress, variant = 'accent' }) {
  return (
    <AnimatedPressable onPress={onPress} style={styles.wrap} scaleTo={0.95}>
      <Text
        style={[styles.label, variant === 'muted' && styles.muted, variant === 'danger' && styles.danger]}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginTop: 14 },
  label: { fontSize: 13.5, fontFamily: fonts.bodySemiBold, color: colors.pine },
  muted: { color: colors.inkSoft, fontSize: 13, textDecorationLine: 'underline' },
  danger: { color: colors.clay, fontSize: 12.5 },
});
