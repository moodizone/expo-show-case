import * as React from "react";
import { Slot } from "expo-router";
import { useAuthStore } from "@/stores/auth";

export default function RootLayout() {
  const { isAuthenticated, isLoading, actions } = useAuthStore();

  React.useEffect(() => {
    if (isAuthenticated) {
    }
  }, []);
  return <Slot />;
}
