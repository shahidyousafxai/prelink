import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors, fonts } from '../theme/theme';

// Matches the prototype's `.trend-line` — an intentionally unlabeled
// directional curve (no axis, no numbers, per the "no raw scores" rule)
// plus a short plain-language caption underneath.
export default function TrendLine({ path, color = colors.pine, label }) {
  return (
    <View>
      <Svg viewBox="0 0 280 60" style={styles.svg}>
        <Path d={path} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />
      </Svg>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  svg: { width: '100%', height: 56, marginBottom: 6 },
  label: { fontSize: 11.5, fontFamily: fonts.body, color: colors.inkSoft, textAlign: 'center' },
});
