import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  centerFlow: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  eyebrow: { fontSize: 11, fontFamily: fonts.bodySemiBold, color: colors.inkSoft, textAlign: 'center', marginBottom: 6 },
  headline: { fontSize: 21, fontFamily: fonts.headline, color: colors.ink, textAlign: 'center', marginBottom: 6 },
  sub: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, textAlign: 'center', marginBottom: 16 },
});
