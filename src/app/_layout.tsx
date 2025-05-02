import * as React from "react";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import "../../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "@/components/AuthProvider";
import thin from "../../assets/fonts/SF-Pro-Display-Thin.otf";
import regular from "../../assets/fonts/SF-Pro-Display-Regular.otf";
import semibold from "../../assets/fonts/SF-Pro-Display-Semibold.otf";
import bold from "../../assets/fonts/SF-Pro-Display-Bold.otf";
import heavy from "../../assets/fonts/SF-Pro-Display-Heavy.otf";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { throwOnError: true, retry: false },
  },
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    thin,
    regular,
    semibold,
    bold,
    heavy,
  });

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
