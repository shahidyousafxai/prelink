import { View, Text, StyleSheet, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, radius, shadows } from '../../theme/theme';
import AnimatedPressable from '../shared/AnimatedPressable';

// Matches the prototype's `.lang-btn` / `.lang-btn.sel`. `rtl` picks the
// Noto Naskh Arabic / Noto Sans Arabic font stack the prototype specifies
// for Arabic and Urdu, instead of the Latin-only PublicSans/Literata fonts.
// `accent` gives each card its own identity color (via a small icon avatar)
// instead of 4 identical plain-text cards. The checkmark badge makes the
// selected state readable at a glance instead of relying on the label
// swapping to "Selected" text alone.
export default function LanguageOption({ native, label, selected, selectedText, rtl, accent, onPress }) {
  return (
    <AnimatedPressable style={[styles.option, selected && styles.selected]} onPress={onPress} scaleTo={0.96}>
      {selected && (
        <View style={styles.badge}>
          <Ionicons name="checkmark" size={12} color={colors.white} />
        </View>
      )}
      <View style={[styles.avatar, { backgroundColor: accent ?? colors.pine }]}>
        <Ionicons name="globe-outline" size={20} color={colors.white} />
      </View>
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
    borderRadius: radius.xl,
    paddingVertical: 24,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  selected: { borderColor: colors.pine, backgroundColor: colors.pineSoft, ...shadows.md },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  badge: {
    position: 'absolute',
    top: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.pine,
    alignItems: 'center',
    justifyContent: 'center',
    ...(I18nManager.isRTL ? { left: 12 } : { right: 12 }),
  },
  // A fixed lineHeight keeps every script inside the same line box — left to
  // its own natural line height, Arabic/Urdu render visibly taller than
  // Latin at the same fontSize even with a matched dedicated font.
  native: { fontSize: 19, lineHeight: 24, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 3 },
  nativeRtl: { fontFamily: fonts.arabicHeadlineBold },
  label: { fontSize: 11.5, lineHeight: 15, fontFamily: fonts.body, color: colors.inkSoft },
  selectedLabel: { color: colors.pine, fontFamily: fonts.bodySemiBold },
});
