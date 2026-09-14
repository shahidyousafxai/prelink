import { View, Text, Switch, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

import { colors, fonts, radius } from '../theme/theme';

// Matches the prototype's `.toggle-row` / `.switch` — used for the consent
// "I understand and agree" acknowledgment.
export default function ToggleRow({ control, name, label }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <Switch
            value={!!value}
            onValueChange={onChange}
            trackColor={{ false: colors.line, true: colors.pine }}
            thumbColor={colors.white}
          />
        </View>
      )}
    />
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
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  label: { fontSize: 13, fontFamily: fonts.bodySemiBold, color: colors.ink, flex: 1, marginRight: 12 },
});
