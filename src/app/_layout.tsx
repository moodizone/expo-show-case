import * as React from "react";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "@/components/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { throwOnError: true, retry: false },
  },
});

export default function RootLayout() {
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
