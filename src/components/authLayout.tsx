import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

import ScreenProvider from "@/components/hoc/ScreenProvider";

interface Props {
  title?: string;
  description?: string;
}

function AuthLayout({
  children,
  description,
  title,
}: React.PropsWithChildren<Props>) {
  return (
    <ScreenProvider>
      <View className="px-8 mt-[10%]">
        <View className="w-[45px] h-[45px] rounded-[12px] overflow-hidden mb-7">
          <LinearGradient
            className="w-full h-full"
            colors={["#40DF9F", "#3ED598"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
        {title ? (
          <Text className="text-meadow-1000 dark:text-white text-[42px] font-bold mb-2">
            {title}
          </Text>
        ) : null}
        {description ? (
          <Text className="mb-9 text-gray-300 dark:text-gray-200 text-[24px] font-bold">
            {"Sign in to continue"}
          </Text>
        ) : null}
        {children}
      </View>
    </ScreenProvider>
  );
}

export default AuthLayout;
