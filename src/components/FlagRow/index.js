import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts, radius, shadows } from '../../theme/theme';
import Badge from '../shared/Badge';
import AnimatedPressable from '../shared/AnimatedPressable';

// Matches the prototype's `.clin-row` — a clinician queue entry with a
// status flag on the right.
export default function FlagRow({ name, sub, flagLabel, flagVariant = 'pine', onPress }) {
  const Wrapper = onPress ? AnimatedPressable : View;
  const wrapperProps = onPress ? { onPress, scaleTo: 0.98 } : {};
  return (
    <Wrapper style={styles.row} {...wrapperProps}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>
      <Badge label={flagLabel} variant={flagVariant} />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    ...shadows.sm,
  },
  name: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.ink },
  sub: { fontSize: 11, fontFamily: fonts.body, color: colors.inkSoft, marginTop: 2 },
});
