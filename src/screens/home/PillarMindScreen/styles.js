import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  card: { marginBottom: 14 },
  taskTitle: { fontSize: 13.5, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 3 },
  taskBody: { fontSize: 12, fontFamily: fonts.body, color: colors.inkSoft },
});
