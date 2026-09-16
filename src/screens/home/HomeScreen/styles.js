import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  greet: { fontSize: 20, fontFamily: fonts.headline, color: colors.ink, marginBottom: 2 },
  greetSub: { fontSize: 12.5, fontFamily: fonts.body, color: colors.inkSoft },
  moodRow: { flexDirection: 'row', gap: 7, marginBottom: 16 },
  heroCard: { borderRadius: 18, padding: 18, marginBottom: 14 },
  heroEyebrow: { fontSize: 11, fontFamily: fonts.bodySemiBold, color: '#BFE0D5', marginBottom: 4 },
  heroTitle: { fontSize: 17, fontFamily: fonts.headline, color: colors.white, marginBottom: 6 },
  heroBody: { fontSize: 12.5, fontFamily: fonts.body, color: '#D9EAE4', lineHeight: 18, marginBottom: 12 },
  heroButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  heroButtonText: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.pine },
  pillars: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginBottom: 8 },
});
