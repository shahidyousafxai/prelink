import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  logoutWrap: { marginTop: 14 },
  confirm: { backgroundColor: colors.pineSoft, borderRadius: 14, padding: 14, marginBottom: 14 },
  confirmText: { fontSize: 13, fontFamily: fonts.bodySemiBold, color: '#1c3b32', textAlign: 'center' },
  languageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  footnote: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, lineHeight: 19 },
  deleteWarning: { fontSize: 12, fontFamily: fonts.bodySemiBold, color: colors.clay, textAlign: 'center', marginTop: 8 },
});
