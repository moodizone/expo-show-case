import * as React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Loading() {
  return (
    <SafeAreaView className="flex-1 justify-center">
      <ActivityIndicator />
    </SafeAreaView>
  );
}

export default Loading;
