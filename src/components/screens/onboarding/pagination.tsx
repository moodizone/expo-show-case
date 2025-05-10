import * as React from "react";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
  interpolateColor,
} from "react-native-reanimated";
import { Dimensions, View } from "react-native";
import { useColorScheme } from "nativewind";

import { data } from "./data";

interface PaginationProps {
  scrollX: SharedValue<number>;
}

interface DotProps {
  index: number;
  scrollX: SharedValue<number>;
}

const { width } = Dimensions.get("screen");

export function Dot({ index, scrollX }: DotProps) {
  const { colorScheme } = useColorScheme();
  const deactiveColor = colorScheme === "light" ? "#EDF1FA" : "#475E69";
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1.2, 0.9],
      Extrapolation.CLAMP
    );
    const backgroundColor = interpolateColor(scrollX.value, inputRange, [
      deactiveColor,
      "#3DD598",
      deactiveColor,
    ]);

    return {
      transform: [{ scale }],
      backgroundColor, // Applying the interpolated color directly
    };
  });

  return (
    <Animated.View
      className={"w-2.5 h-2.5 rounded-[5px] mx-2"}
      style={[animatedStyle]}
    />
  );
}

export function Pagination({ scrollX }: PaginationProps) {
  return (
    <View className="flex-row justify-center">
      {Array.from({ length: data.length }).map((_, i) => (
        <Dot key={i} index={i} scrollX={scrollX} />
      ))}
    </View>
  );
}
