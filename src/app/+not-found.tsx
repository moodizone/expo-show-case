import * as React from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";

import ErrorContainer from "@/components/error";
import { ROUTES } from "@/routes";
import ScreenProvider from "@/components/hoc/ScreenProvider";

function NotFound() {
  return (
    <ScreenProvider bg="#FF575F">
      <ErrorContainer>
        <View className="flex-1 items-center justify-center py-4 px-8">
          <Text className="text-white text-[60px] font-heavy leading-[72px]">
            {"404"}
          </Text>
          <Text className="text-white text-[24px] font-bold leading-[30px] font-regular mb-8">
            {"Page not found"}
          </Text>
          <Text className="text-white text-[16px] leading-[20px] font-regular text-center mb-6">
            {"May be bigfoot has broken this page. Come back to the homepage"}
          </Text>
          <Link href={ROUTES.home} className="text-white underline text-[16px]">
            {"Back to home"}
          </Link>
        </View>
      </ErrorContainer>
    </ScreenProvider>
  );
}

export default NotFound;
