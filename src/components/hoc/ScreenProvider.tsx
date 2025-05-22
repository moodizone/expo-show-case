import * as React from "react";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Button, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ROUTES } from "@/routes";

interface Props {
  hide?: boolean;
  bg?: string;
}

function ScreenProvider({
  children,
  bg,
  hide = false,
}: React.PropsWithChildren<Props>) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useLocalSearchParams();
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join("&");
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const fallbackBg = colorScheme === "light" ? "#ffffff" : "#22343C";

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-[#22343C]"
      edges={["top", "bottom"]}
    >
      <StatusBar
        barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
        backgroundColor={bg ?? fallbackBg}
      />
      {hide ? null : (
        <View className="py-3 px-[30px] items-center justify-start flex-row gap-3 border-b-[1px] border-gray-300 dark:border-gray-200">
          <Text className="flex-grow flex-shrink text-gray-950 dark:text-gray-50">{`${pathname}${
            queryString ? "?" + queryString : ""
          }`}</Text>
          <View className="flex-grow-0 flex-shrink-0 gap-x-1 flex-row flex-nowrap">
            <Button
              onPress={toggleColorScheme}
              title={"Theme"}
              accessibilityLabel="Learn more about this purple button"
            />
            <Button
              onPress={() => router.dismissTo(ROUTES.home)}
              title={"Home"}
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </View>
      )}
      {children}
    </SafeAreaView>
  );
}

export default ScreenProvider;
