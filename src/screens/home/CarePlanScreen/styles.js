import { StyleSheet, I18nManager } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  actionCard: {
    backgroundColor: colors.goldSoft,
    borderColor: 'transparent',
    ...(I18nManager.isRTL
      ? { borderRightWidth: 4, borderRightColor: colors.gold }
      : { borderLeftWidth: 4, borderLeftColor: colors.gold }),
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1, fontSize: 13.5, fontFamily: fonts.bodyBold, color: colors.ink },
  bodyLast: { fontSize: 12, fontFamily: fonts.body, color: colors.inkSoft },
});
