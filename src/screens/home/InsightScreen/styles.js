import { StyleSheet } from 'react-native';

import { colors, fonts, radius } from '../../../theme/theme';

export const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  headline: { fontSize: 21, fontFamily: fonts.headline, color: colors.ink, marginBottom: 12 },
  body: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 12,
  },
  bodyText: { fontSize: 13, fontFamily: fonts.body, color: colors.ink, lineHeight: 20 },
  helpsCard: { backgroundColor: colors.pineSoft, borderRadius: radius.md, padding: 13, marginBottom: 12 },
  helpsTitle: { fontSize: 12, fontFamily: fonts.bodyBold, color: colors.pine, marginBottom: 3 },
  helpsBody: { fontSize: 12.5, fontFamily: fonts.body, color: '#284A40' },
});
