import { View, Text, Switch, StyleSheet, I18nManager } from 'react-native';
import { Controller } from 'react-hook-form';

import { colors, fonts, radius } from '../../../theme/theme';

function Row({ label, value, onValueChange }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={!!value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.line, true: colors.pine }}
        thumbColor={colors.white}
      />
    </View>
  );
}

// Matches the prototype's `.toggle-row` / `.switch`. Pass `control`+`name`
// to wire it into a react-hook-form field (e.g. the consent "I understand
// and agree" acknowledgment), or `value`+`onValueChange` for a standalone
// live toggle with no form/submit concept (e.g. Manage Consent's stages).
export default function ToggleRow({ control, name, label, value, onValueChange }) {
  if (control) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => <Row label={label} value={field.value} onValueChange={field.onChange} />}
      />
    );
  }

  return <Row label={label} value={value} onValueChange={onValueChange} />;
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
  label: {
    fontSize: 13,
    fontFamily: fonts.bodySemiBold,
    color: colors.ink,
    flex: 1,
    ...(I18nManager.isRTL ? { marginLeft: 12 } : { marginRight: 12 }),
  },
});
