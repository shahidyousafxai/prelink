import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

import { colors, radius, fonts } from '../theme/theme';

// Matches the prototype's `.field-label` + invite screen's `.text-input`.
export default function TextField({ control, name, label, error, ...inputProps }) {
  return (
    <View style={styles.wrap}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholderTextColor={colors.inkSoft}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...inputProps}
          />
        )}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: {
    fontSize: 11.5,
    fontFamily: fonts.bodyBold,
    color: colors.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 7,
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radius.sm,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 13.5,
    fontFamily: fonts.body,
    color: colors.ink,
    backgroundColor: colors.white,
  },
  inputError: { borderColor: colors.clay },
  error: { fontSize: 12, fontFamily: fonts.bodySemiBold, color: colors.clay, marginTop: 6 },
});
