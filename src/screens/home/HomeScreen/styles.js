import { StyleSheet } from 'react-native';

import { colors, fonts, shadows } from '../../../theme/theme';

export const styles = StyleSheet.create({
  headerRow: { marginBottom: 16 },
  greet: { fontSize: 23, fontFamily: fonts.headlineBold, color: colors.ink, marginBottom: 3 },
  greetSub: { fontSize: 12.5, fontFamily: fonts.body, color: colors.inkSoft },
  moodRow: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  heroCard: { borderRadius: 20, padding: 20, marginBottom: 16, ...shadows.md },
  heroTitle: { fontSize: 18, fontFamily: fonts.headlineBold, color: colors.white, marginBottom: 6 },
  heroBody: { fontSize: 12.5, fontFamily: fonts.body, color: '#D9EAE4', lineHeight: 18, marginBottom: 14 },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  heroButtonText: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.pine },
  pillars: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 10 },
});
