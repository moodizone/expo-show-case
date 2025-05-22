import * as React from "react";
import Svg, { Circle, Rect } from "react-native-svg";
import { LayoutChangeEvent, Text, View } from "react-native";

interface Props {
  error: Error;
  className?: string;
}

export function ErrorContainer({ children }: React.PropsWithChildren) {
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  return (
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
      {children}
    </View>
  );
}

export function ErrorAlert({ error, className }: Props) {
  return (
    <View className={className}>
      <Text className="text-meadow-1000 dark:text-white text-[20px] font-bold leading-[30px] font-regular mb-2">
        {error.name}
      </Text>
      <Text className="text-meadow-1000 dark:text-white text-[14px] leading-[20px] font-regular">
        {error.message}
      </Text>
    </View>
  );
}
