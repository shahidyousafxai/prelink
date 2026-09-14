import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../theme/theme';

export const styles = StyleSheet.create({
  confirm: { backgroundColor: colors.pineSoft, borderRadius: 14, padding: 14 },
  confirmText: { fontSize: 13, fontFamily: fonts.bodySemiBold, color: '#1c3b32', textAlign: 'center' },
});
