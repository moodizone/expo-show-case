import * as React from "react";
import { Slot } from "expo-router";

import "../../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "@/components/AuthProvider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
