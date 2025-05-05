import * as React from "react";
import { Text } from "react-native";
import { useColorScheme } from "nativewind";

import ScreenProvider from "@/components/hoc/ScreenProvider";

function Home() {
  const { colorScheme } = useColorScheme();
  return (
    <ScreenProvider>
      <Text className="text-gray-900 dark:text-gray-50">{colorScheme}</Text>
    </ScreenProvider>
  );
}

export default Home;
