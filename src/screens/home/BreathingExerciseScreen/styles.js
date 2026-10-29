import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  centerFlow: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headline: { fontSize: 19, fontFamily: fonts.headlineBold, color: colors.ink, textAlign: 'center', marginBottom: 6 },
  sub: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, textAlign: 'center', marginBottom: 8 },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.pineSoft,
    borderWidth: 2,
    borderColor: colors.pine,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
  },
  circleText: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.pine },
  timer: { fontSize: 12, fontFamily: fonts.body, color: colors.inkSoft, marginBottom: 6 },
});
