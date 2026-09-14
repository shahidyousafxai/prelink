import { Pressable, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../theme/theme';

// Matches the prototype's `.lang-btn` / `.lang-btn.sel`.
export default function LanguageOption({ native, label, selected, onPress }) {
  return (
    <Pressable style={[styles.option, selected && styles.selected]} onPress={onPress}>
      <Text style={styles.native}>{native}</Text>
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
  },
  selected: { borderColor: colors.pine, backgroundColor: colors.pineSoft },
  native: { fontSize: 17, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 2 },
  label: { fontSize: 11, fontFamily: fonts.body, color: colors.inkSoft },
  selectedLabel: { color: colors.pine, fontFamily: fonts.bodySemiBold },
});
