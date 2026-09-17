import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  progress: { fontSize: 11, fontFamily: fonts.bodyBold, color: colors.inkSoft, marginBottom: 4 },
  centerFlow: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headline: { fontSize: 21, fontFamily: fonts.headline, color: colors.ink, textAlign: 'center', marginBottom: 6 },
  sub: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, textAlign: 'center' },
  wordGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, width: '100%', marginTop: 18 },
  doneTitle: { fontSize: 14.5, fontFamily: fonts.bodyBold, color: colors.ink, textAlign: 'center' },
  doneSub: {
    fontSize: 12.5,
    fontFamily: fonts.body,
    color: colors.inkSoft,
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 16,
  },
});
