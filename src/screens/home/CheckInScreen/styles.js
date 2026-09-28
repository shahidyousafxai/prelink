import { StyleSheet } from 'react-native';

import { colors, fonts, shadows } from '../../../theme/theme';

export const styles = StyleSheet.create({
  headline: {
    fontSize: 22,
    fontFamily: fonts.headlineBold,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 6,
  },
  sub: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, textAlign: 'center' },
  options: { width: '100%', gap: 10, marginTop: 22 },
  doneCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 18,
    ...shadows.md,
  },
  doneTitle: { fontSize: 19, fontFamily: fonts.headlineBold, color: colors.ink, textAlign: 'center', marginBottom: 5 },
  doneSub: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, textAlign: 'center' },
});
