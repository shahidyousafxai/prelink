import { View, Text, StyleSheet, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, shadows } from '../../theme/theme';
import AnimatedPressable from '../shared/AnimatedPressable';

// Matches the prototype's `.lang-btn` / `.lang-btn.sel`. `rtl` picks the
// Noto Naskh Arabic / Noto Sans Arabic font stack the prototype specifies
// for Arabic and Urdu, instead of the Latin-only PublicSans/Literata fonts.
// The checkmark badge makes the selected state readable at a glance instead
// of relying on the label swapping to "Selected" text alone.
export default function LanguageOption({ native, label, selected, selectedText, rtl, onPress }) {
  return (
    <AnimatedPressable style={[styles.option, selected && styles.selected]} onPress={onPress} scaleTo={0.96}>
      {selected && (
        <View style={styles.badge}>
          <Ionicons name="checkmark" size={12} color={colors.white} />
        </View>
      )}
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
  badge: {
    position: 'absolute',
    top: 10,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.pine,
    alignItems: 'center',
    justifyContent: 'center',
    ...(I18nManager.isRTL ? { left: 10 } : { right: 10 }),
  },
  // A fixed lineHeight keeps every script inside the same line box — left to
  // its own natural line height, Arabic/Urdu render visibly taller than
  // Latin at the same fontSize even with a matched dedicated font.
  native: { fontSize: 17, lineHeight: 22, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 2 },
  nativeRtl: { fontFamily: fonts.arabicHeadlineBold },
  label: { fontSize: 11, lineHeight: 14, fontFamily: fonts.body, color: colors.inkSoft },
  selectedLabel: { color: colors.pine, fontFamily: fonts.bodySemiBold },
});
