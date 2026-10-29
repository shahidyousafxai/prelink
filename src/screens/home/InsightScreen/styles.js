import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  headline: { fontSize: 19, fontFamily: fonts.headlineBold, color: colors.ink, marginBottom: 12 },
  sub: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, lineHeight: 19, marginTop: 14, marginBottom: 16 },
});
