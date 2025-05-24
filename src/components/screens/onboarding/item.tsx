import { Dimensions, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

import { data } from "@/components/screens/onboarding/data";


interface Props {
  index: number;
  scrollX: SharedValue<number>;
}

const { width } = Dimensions.get("window");

export function SliderItem({ index, scrollX }: Props) {
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollX.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [-width * 0.25, 0, width * 0.25],
          Extrapolation.CLAMP
        ),
      },
      {
        scale: interpolate(
          scrollX.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [0.9, 1, 0.9],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[{ width }, animatedStyles]} className={"py-4"}>
      <View
        className={"h-[420px] w-[300px] mx-auto bg-transparent rounded-[25px]"}
        style={{
          shadowColor: "#041410",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <View className="h-full w-full bg-meadow-250 rounded-[25px] overflow-hidden">
          <Image
            style={{
              flex: 1,
            }}
            className="w-full bg-transparent"
            source={data[index].url}
            contentFit="cover"
            transition={300}
          />
          <LinearGradient
            colors={["#1A3B3400", "#0B0B0B40"]}
            className="absolute top-0 left-0 w-full h-full"
            start={{ x: 1, y: 0.3 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
      </View>
    </Animated.View>
  );
}
