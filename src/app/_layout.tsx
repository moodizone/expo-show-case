import * as React from "react";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../../global.css";
import AuthProvider from "@/components/hoc/AuthProvider";
import { ThemeProvider } from "@/components/hoc/ThemeProvider";
import thin from "../../assets/fonts/SF-Pro-Display-Thin.otf";
import regular from "../../assets/fonts/SF-Pro-Display-Regular.otf";
import semibold from "../../assets/fonts/SF-Pro-Display-Semibold.otf";
import bold from "../../assets/fonts/SF-Pro-Display-Bold.otf";
import heavy from "../../assets/fonts/SF-Pro-Display-Heavy.otf";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { throwOnError: false, retry: false },
  },
});

export default function RootLayout() {
  const [fontLoaded, fontErrors] = useFonts({
    thin,
    regular,
    semibold,
    bold,
    heavy,
  });

  if (!fontLoaded && !fontErrors) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <GestureHandlerRootView>
              <Slot />
            </GestureHandlerRootView>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
