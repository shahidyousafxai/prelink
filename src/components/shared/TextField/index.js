import { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, I18nManager } from 'react-native';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, fonts } from '../../../theme/theme';
import FieldLabel from '../FieldLabel';
import FormError from '../FormError';

// Matches the invite screen's `.text-input`. Passing `secureTextEntry`
// marks this as a password field and adds an eye toggle to show/hide the
// value, instead of a permanently masked input. `icon` optionally renders a
// leading Ionicons glyph (e.g. "mail-outline") for better field affordance —
// unused by most screens, opt-in only.
export default function TextField({ control, name, label, error, secureTextEntry, icon, ...inputProps }) {
  const [isVisible, setIsVisible] = useState(false);
  const isPassword = !!secureTextEntry;

  return (
    <View style={styles.wrap}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputWrap}>
            {icon && (
              <View style={styles.leadingIcon}>
                <Ionicons name={icon} size={17} color={colors.inkSoft} />
              </View>
            )}
            <TextInput
              style={[
                styles.input,
                icon && styles.inputWithLeadingIcon,
                isPassword && styles.inputWithIcon,
                error && styles.inputError,
              ]}
              placeholderTextColor={colors.inkSoft}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isPassword && !isVisible}
              {...inputProps}
            />
            {isPassword && (
              <Pressable style={styles.icon} onPress={() => setIsVisible((v) => !v)} hitSlop={8}>
                <Ionicons name={isVisible ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.inkSoft} />
              </Pressable>
            )}
          </View>
        )}
      />
      {error && <FormError message={error} align="left" />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  inputWrap: { justifyContent: 'center' },
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
  inputWithIcon: I18nManager.isRTL ? { paddingLeft: 40 } : { paddingRight: 40 },
  inputWithLeadingIcon: I18nManager.isRTL ? { paddingRight: 38 } : { paddingLeft: 38 },
  inputError: { borderColor: colors.clay },
  icon: I18nManager.isRTL ? { position: 'absolute', left: 12 } : { position: 'absolute', right: 12 },
  leadingIcon: I18nManager.isRTL ? { position: 'absolute', right: 13, zIndex: 1 } : { position: 'absolute', left: 13, zIndex: 1 },
});
