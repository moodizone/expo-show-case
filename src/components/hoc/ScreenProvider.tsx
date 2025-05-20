import { useLocalSearchParams, usePathname } from "expo-router";
import { useColorScheme } from "nativewind";
import * as React from "react";
import { Button, SafeAreaView, StatusBar, Text, View } from "react-native";

interface Props {
  hide?: boolean;
  bg?: string;
}

function ScreenProvider({
  children,
  bg,
  hide = false,
}: React.PropsWithChildren<Props>) {
  const pathname = usePathname();
  const params = useLocalSearchParams();
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join("&");
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const fallbackBg = colorScheme === "light" ? "#ffffff" : "#22343C";
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#22343C]">
      <StatusBar
        barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
        backgroundColor={bg ?? fallbackBg}
      />
      {hide ? null : (
        <View className="py-3 px-[30px] justify-between flex-row gap-3">
          <Text className="text-gray-950 dark:text-gray-50">{`${pathname}?${queryString}`}</Text>
          <Button
            onPress={toggleColorScheme}
            title={colorScheme ?? "toggle"}
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      )}
      {children}
    </SafeAreaView>
  );
}

export default ScreenProvider;
