import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  headline: { fontSize: 21, fontFamily: fonts.headline, color: colors.ink, textAlign: 'center', marginBottom: 6 },
  sub: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, textAlign: 'center' },
  options: { width: '100%', gap: 9, marginTop: 18 },
  doneTitle: { fontSize: 15, fontFamily: fonts.bodyBold, color: colors.ink, textAlign: 'center', marginBottom: 3 },
  doneSub: { fontSize: 12.5, fontFamily: fonts.body, color: colors.inkSoft, textAlign: 'center' },
});
