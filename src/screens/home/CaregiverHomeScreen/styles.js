import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  centerFlow: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  lockedIcon: { alignSelf: 'center', marginBottom: 10 },
  lockedTitle: { fontSize: 16, fontFamily: fonts.headline, color: colors.ink, textAlign: 'center', marginBottom: 6 },
  lockedSub: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, textAlign: 'center' },
  eyebrow: { fontSize: 11, fontFamily: fonts.bodySemiBold, color: colors.inkSoft, marginBottom: 10 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 14 },
  headerText: { flex: 1 },
  name: { fontSize: 14, fontFamily: fonts.bodyBold, color: colors.ink },
  summaryOnly: { fontSize: 11.5, fontFamily: fonts.body, color: colors.inkSoft },
  card: { marginBottom: 10 },
  cardLabel: { fontSize: 11.5, fontFamily: fonts.bodyBold, color: colors.inkSoft, marginBottom: 5 },
  cardBody: { fontSize: 13, fontFamily: fonts.body, color: colors.ink },
  trustNote: {
    fontSize: 10.5,
    fontFamily: fonts.body,
    color: colors.inkSoft,
    textAlign: 'center',
    lineHeight: 15,
    marginTop: 16,
  },
});
