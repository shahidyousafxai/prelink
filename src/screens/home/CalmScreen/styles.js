import { StyleSheet, I18nManager } from 'react-native';

import { colors, fonts, radius } from '../../../theme/theme';

export const styles = StyleSheet.create({
  stressRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  stressChip: {
    flexGrow: 1,
    minWidth: 90,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  stressChipSelected: { borderColor: colors.pine, backgroundColor: colors.pineSoft },
  stressLabel: { fontSize: 12.5, fontFamily: fonts.bodySemiBold, color: colors.inkSoft },
  stressLabelSelected: { color: colors.pine },
  breatheCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sandDeep,
    borderColor: 'transparent',
    ...(I18nManager.isRTL
      ? { borderRightWidth: 4, borderRightColor: colors.ink }
      : { borderLeftWidth: 4, borderLeftColor: colors.ink }),
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...(I18nManager.isRTL ? { marginLeft: 12 } : { marginRight: 12 }),
  },
  breatheText: { flex: 1 },
  breatheTitle: { fontSize: 13.5, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 2 },
  breatheBody: { fontSize: 12, fontFamily: fonts.body, color: colors.inkSoft },
});
