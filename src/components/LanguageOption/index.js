import { Text, StyleSheet } from 'react-native';

import { colors, fonts, radius, shadows } from '../../theme/theme';
import AnimatedPressable from '../shared/AnimatedPressable';

// Matches the prototype's `.lang-btn` / `.lang-btn.sel`. `rtl` picks the
// Noto Naskh Arabic / Noto Sans Arabic font stack the prototype specifies
// for Arabic and Urdu, instead of the Latin-only PublicSans/Literata fonts.
export default function LanguageOption({ native, label, selected, selectedText, rtl, onPress }) {
  return (
    <AnimatedPressable style={[styles.option, selected && styles.selected]} onPress={onPress} scaleTo={0.96}>
      <Text style={[styles.native, rtl && styles.nativeRtl]}>{native}</Text>
      <Text style={[styles.label, selected && styles.selectedLabel]}>{selected ? selectedText : label}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  option: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radius.lg,
    paddingVertical: 18,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  selected: { borderColor: colors.pine, backgroundColor: colors.pineSoft, ...shadows.md },
  // A fixed lineHeight keeps every script inside the same line box — left to
  // its own natural line height, Arabic/Urdu render visibly taller than
  // Latin at the same fontSize even with a matched dedicated font.
  native: { fontSize: 17, lineHeight: 22, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 2 },
  nativeRtl: { fontFamily: fonts.arabicHeadlineBold },
  label: { fontSize: 11, lineHeight: 14, fontFamily: fonts.body, color: colors.inkSoft },
  selectedLabel: { color: colors.pine, fontFamily: fonts.bodySemiBold },
});
