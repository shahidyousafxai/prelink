import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  card: { marginBottom: 10 },
  faded: { opacity: 0.7 },
  time: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 3 },
  copy: { fontSize: 12.5, fontFamily: fonts.body, color: colors.inkSoft },
  italic: { fontStyle: 'italic' },
});
