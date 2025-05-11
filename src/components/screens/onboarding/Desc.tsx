import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import { Dimensions, Text, View } from "react-native";

import { data } from "./data";

interface DescProps {
  scrollX: SharedValue<number>;
}
interface DetailsProps {
  scrollX: SharedValue<number>;
  index: number;
}

const { width } = Dimensions.get("window");

function Details({ scrollX, index }: DetailsProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [150, 0, -150],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <Animated.View style={animatedStyle} className={"absolute inset-0 left-0"}>
      <Text className="text-meadow-1000 dark:text-white text-[22px] font-bold text-center my-2">
        {data[index].title}
      </Text>
      <Text className="max-w-[270px] text-center mx-auto text-[16px] font-regular text-gray-300 dark:text-gray-200">
        {data[index].description}
      </Text>
    </Animated.View>
  );
}

export function Desc({ scrollX }: DescProps) {
  return (
    <View className="px-8 mt-4 w-full h-[120px] overflow-hidden">
      {data.map((_, index) => (
        <Details key={index} scrollX={scrollX} index={index} />
      ))}
    </View>
  );
}
