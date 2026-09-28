import { View, Text, StyleSheet, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius } from '../../../theme/theme';

// `variant="disclaimer"` (default) matches `.disclaimer-banner` — gets a
// leading icon since it's the only variant used standalone (About's medical
// disclaimer), not alongside other governance copy.
// `variant="governance"` matches `.gov-banner` — a neutral, dashed-border
// note used on clinician screens ("every access is logged...").
export default function Banner({ children, variant = 'disclaimer' }) {
  const isGovernance = variant === 'governance';

  if (isGovernance) {
    return <Text style={[styles.banner, styles.governance]}>{children}</Text>;
  }

  return (
    <View style={[styles.banner, styles.disclaimerRow]}>
      <Ionicons name="information-circle" size={16} color="#5a2c1c" style={styles.icon} />
      <Text style={styles.disclaimerText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.claySoft,
    borderRadius: radius.sm,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  disclaimerRow: { flexDirection: 'row', alignItems: 'flex-start' },
  icon: I18nManager.isRTL ? { marginLeft: 8, marginTop: 1 } : { marginRight: 8, marginTop: 1 },
  disclaimerText: { flex: 1, fontSize: 12, fontWeight: '600', color: '#5a2c1c', lineHeight: 17 },
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
