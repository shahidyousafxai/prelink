import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, floatingTabBarClearance } from '../../../theme/theme';

// Shared shell for auth + onboarding screens: sand background (matching the
// prototype's phone chrome), keyboard-avoiding + scrollable so longer forms
// never get stuck behind the keyboard on smaller devices. Padding accounts
// for the safe area so content never sits under the status bar/notch.
// `tabBarInset` adds extra bottom clearance for the 4 screens shown under
// the floating tab bar, which sits on top of content instead of pushing it
// up.
export default function ScreenLayout({ children, center = true, tabBarInset = false }) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 24),
            paddingBottom: Math.max(insets.bottom, 24) + (tabBarInset ? floatingTabBarClearance : 0),
          },
          center && styles.centered,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.sand },
  content: { flexGrow: 1, paddingHorizontal: 24 },
  centered: { justifyContent: 'center' },
});
