import * as React from "react";
import { Text, View } from "react-native";

import {ErrorContainer} from "@/components/error";
import ScreenProvider from "@/components/hoc/ScreenProvider";

function Hi() {
  return (
    <ScreenProvider bg="#FF575F">
      <ErrorContainer>
        <View className="px-8 mt-[190px]">
          <Text className="text-white text-[42px] font-bold">
            {"Marvie \nIOS UI Kit"}
          </Text>
          <Text className="text-white text-[24px] font-regular mb-4">
            {"Now it’s dark"}
          </Text>
          <Text className="text-white font-regular text-[18px] leading-[24px]">
            {
              "Marvie is your top-notch multipurpose UI kit with bright and friendly colors. Full-featured and handy. Trendy and eye-catching. Created with care of designers and users."
            }
          </Text>
        </View>
      </ErrorContainer>
    </ScreenProvider>
  );
}

export default Hi;
