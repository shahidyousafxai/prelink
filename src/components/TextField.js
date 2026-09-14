import { View, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

import { colors, radius, fonts } from '../theme/theme';
import FieldLabel from './FieldLabel';
import FormError from './FormError';

// Matches the invite screen's `.text-input`.
export default function TextField({ control, name, label, error, ...inputProps }) {
  return (
    <View style={styles.wrap}>
      {label && <FieldLabel>{label}</FieldLabel>}
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
      {error && <FormError message={error} align="left" />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
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
});
