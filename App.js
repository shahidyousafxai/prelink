import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Literata_600SemiBold, Literata_700Bold } from '@expo-google-fonts/literata';
import {
  PublicSans_400Regular,
  PublicSans_500Medium,
  PublicSans_600SemiBold,
  PublicSans_700Bold,
} from '@expo-google-fonts/public-sans';
import { NotoNaskhArabic_700Bold } from '@expo-google-fonts/noto-naskh-arabic';
import {
  NotoSansArabic_400Regular,
  NotoSansArabic_500Medium,
  NotoSansArabic_600SemiBold,
} from '@expo-google-fonts/noto-sans-arabic';

import i18n from './src/i18n';
import { queryClient } from './src/network/query.config';
import { useOnboardingStatusQuery, useSessionQuery } from './src/network/authentication/authQueries';
import { useLanguageQuery } from './src/network/language/languageQueries';
import RootNavigator from './src/navigation/RootNavigator';

SplashScreen.preventAutoHideAsync().catch(() => {});

function AppContent() {
  const { isLoading: isSessionLoading } = useSessionQuery();
  const { isLoading: isOnboardingLoading } = useOnboardingStatusQuery();
  const { isLoading: isLanguageLoading, language } = useLanguageQuery();
  const [fontsLoaded] = useFonts({
    Literata_600SemiBold,
    Literata_700Bold,
    PublicSans_400Regular,
    PublicSans_500Medium,
    PublicSans_600SemiBold,
    PublicSans_700Bold,
    NotoNaskhArabic_700Bold,
    NotoSansArabic_400Regular,
    NotoSansArabic_500Medium,
    NotoSansArabic_600SemiBold,
  });

  const isLoading = isSessionLoading || isOnboardingLoading || isLanguageLoading || !fontsLoaded;

  useEffect(() => {
    // Only a mismatch on first launch (persisted language differs from the
    // device-detected default i18n booted with) — an actual language change
    // goes through useSetLanguageMutation, which already calls this.
    if (!isLanguageLoading && language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  }, [isLanguageLoading, language]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent />
          <StatusBar style="auto" />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
