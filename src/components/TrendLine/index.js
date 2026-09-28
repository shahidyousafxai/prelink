import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

import { colors, fonts } from '../../theme/theme';

// Matches the prototype's `.trend-line` — an intentionally unlabeled
// directional curve (no axis, no numbers, per the "no raw scores" rule)
// plus a short plain-language caption underneath. The soft gradient fill
// under the curve (fading to transparent) gives it an "area chart" feel
// instead of a bare line, while staying just as unlabeled/scoreless.
export default function TrendLine({ path, color = colors.pine, label }) {
  const areaPath = `${path} L280,60 L0,60 Z`;

  return (
    <View>
      <Svg viewBox="0 0 280 60" style={styles.svg}>
        <Defs>
          <LinearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity={0.22} />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Path d={areaPath} fill="url(#trendArea)" />
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
