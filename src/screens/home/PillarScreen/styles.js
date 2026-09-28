import { StyleSheet, I18nManager } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  card: { marginBottom: 14 },
  taskCard: { flexDirection: 'row', alignItems: 'center' },
  taskAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...(I18nManager.isRTL ? { marginLeft: 12 } : { marginRight: 12 }),
  },
  taskText: { flex: 1 },
  taskTitle: { fontSize: 13.5, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 3 },
  taskBody: { fontSize: 12, fontFamily: fonts.body, color: colors.inkSoft },
});
