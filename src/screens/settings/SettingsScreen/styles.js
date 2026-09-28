import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  card: { marginBottom: 4 },
  logoutWrap: { marginTop: 14 },
  languageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  footnote: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, lineHeight: 19 },
  inviteAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.pine,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
});
