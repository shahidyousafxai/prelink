import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  title: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 4 },
  body: { fontSize: 12, fontFamily: fonts.body, color: colors.inkSoft, marginBottom: 12 },
  bodyLast: { fontSize: 12, fontFamily: fonts.body, color: colors.inkSoft },
});
