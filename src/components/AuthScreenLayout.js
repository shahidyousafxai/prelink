import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import { colors } from '../theme/theme';

// Shared shell for auth screens: sand background (matching the prototype's
// phone chrome), keyboard-avoiding + scrollable so longer forms (Sign Up)
// never get stuck behind the keyboard on smaller devices.
export default function AuthScreenLayout({ children }) {
  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.sand },
  content: { flexGrow: 1, padding: 24, justifyContent: 'center' },
});
