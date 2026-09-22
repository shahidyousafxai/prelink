import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  logoutWrap: { marginTop: 14 },
  languageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  footnote: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, lineHeight: 19 },
});
