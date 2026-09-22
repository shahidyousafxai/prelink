import { Pressable, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../../theme/theme';

// Matches the prototype's `.lang-btn` / `.lang-btn.sel`. `rtl` picks the
// Noto Naskh Arabic / Noto Sans Arabic font stack the prototype specifies
// for Arabic and Urdu, instead of the Latin-only PublicSans/Literata fonts.
export default function LanguageOption({ native, label, selected, rtl, onPress }) {
  return (
    <Pressable style={[styles.option, selected && styles.selected]} onPress={onPress}>
      <Text style={[styles.native, rtl && styles.nativeRtl]}>{native}</Text>
      <Text style={[styles.label, selected && styles.selectedLabel]}>{selected ? 'Selected' : label}</Text>
    </Pressable>
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
  },
  selected: { borderColor: colors.pine, backgroundColor: colors.pineSoft },
  // A fixed lineHeight keeps every script inside the same line box — left to
  // its own natural line height, Arabic/Urdu render visibly taller than
  // Latin at the same fontSize even with a matched dedicated font.
  native: { fontSize: 17, lineHeight: 22, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 2 },
  nativeRtl: { fontFamily: fonts.arabicHeadlineBold },
  label: { fontSize: 11, lineHeight: 14, fontFamily: fonts.body, color: colors.inkSoft },
  selectedLabel: { color: colors.pine, fontFamily: fonts.bodySemiBold },
});
