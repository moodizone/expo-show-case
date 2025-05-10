import * as React from "react";
import Svg, { Circle, Rect } from "react-native-svg";
import { LayoutChangeEvent, Text, View } from "react-native";

import { Link } from "expo-router";

import ScreenProvider from "@/components/hoc/ScreenProvider";
import { ROUTES } from "@/routes";

function Hi() {
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  return (
    <ScreenProvider bg="#FF575F">
      <View style={{ flex: 1, backgroundColor: "#FF575F" }} onLayout={onLayout}>
        {size.width > 0 && size.height > 0 && (
          <View className="absolute w-full h-full">
            <Svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${size.width} ${size.height}`}
            >
              <Rect
                x={size.width - 140 + 19}
                y={0}
                width={140}
                height={140}
                fill="#FF464F"
                stroke="red"
                strokeWidth="0"
                rx="25"
                ry="25"
              />
              <Rect
                x={size.width - 160 - 61}
                y={size.height - 160 - 156}
                width={160}
                height={160}
                fill="#FF464F"
                stroke="red"
                strokeWidth="0"
                rx="25"
                ry="25"
              />
              <Rect
                x={0}
                y={size.height - 170 + 29}
                width={170}
                height={170}
                fill="#FF464F"
                stroke="red"
                strokeWidth="0"
                rx="25"
                ry="25"
              />
              <Circle
                cx={-36 + 60}
                cy={180 + 60}
                r={60}
                fill="#FF464F"
                strokeWidth="0"
              />
            </Svg>
          </View>
        )}
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
          <Link
            href={ROUTES.onboarding}
            className="text-[14px] leading-[24px] font-medium text-white mt-4"
          >
            {"Go to onboarding"}
          </Link>
        </View>
      </View>
    </ScreenProvider>
  );
}

export default Hi;
