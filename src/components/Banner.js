import { Text, StyleSheet } from 'react-native';

import { colors, radius } from '../theme/theme';

// `variant="disclaimer"` (default) matches `.disclaimer-banner`.
// `variant="governance"` matches `.gov-banner` — a neutral, dashed-border
// note used on clinician screens ("every access is logged...").
export default function Banner({ children, variant = 'disclaimer' }) {
  return <Text style={[styles.banner, variant === 'governance' && styles.governance]}>{children}</Text>;
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.claySoft,
    borderRadius: radius.sm,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 12,
    fontWeight: '600',
    color: '#5a2c1c',
    marginBottom: 14,
    lineHeight: 17,
  },
  governance: {
    backgroundColor: '#EFEAE0',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.line,
    color: colors.inkSoft,
    fontSize: 11,
    fontWeight: '400',
    paddingVertical: 10,
  },
});
