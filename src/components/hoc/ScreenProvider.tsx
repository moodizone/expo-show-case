import { usePathname } from "expo-router";
import { useColorScheme } from "nativewind";
import * as React from "react";
import { Button, SafeAreaView, StatusBar, Text, View } from "react-native";

function ScreenProvider({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#22343C]">
      <StatusBar
        barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
        backgroundColor={colorScheme === "light" ? "#ffffff" : "#22343C"}
      />
      <View className="p-3 justify-between flex-row gap-3">
        <Text className="p-3 text-gray-950 dark:text-gray-50">{`Pathname: ${pathname}`}</Text>
        <Button
          onPress={toggleColorScheme}
          title={colorScheme ?? "toggle"}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      {children}
    </SafeAreaView>
  );
}

export default ScreenProvider;
