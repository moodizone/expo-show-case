import { useColorScheme } from "nativewind";
import * as React from "react";
import { SafeAreaView, StatusBar } from "react-native";

function ScreenProvider({ children }: React.PropsWithChildren) {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#22343C]">
      <StatusBar
        barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
        backgroundColor={colorScheme === "light" ? "#ffffff" : "#22343C"}
      />
      {children}
    </SafeAreaView>
  );
}

export default ScreenProvider;
