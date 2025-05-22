import * as React from "react";
import { ActivityIndicator, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

export function Loading() {
  return (
    <SafeAreaView className="flex-1 justify-center">
      <ActivityIndicator />
    </SafeAreaView>
  );
}
export function LoadingAlert({ className, ...others }: ViewProps) {
  return (
    <View
      {...others}
      className={twMerge("items-center", className)}
    >
      <ActivityIndicator color={"#3DD598"} size={24} />
    </View>
  );
}
