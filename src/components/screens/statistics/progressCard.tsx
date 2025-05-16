import * as React from "react";
import { useColorScheme } from "nativewind";
import { Canvas, Text, useFont } from "@shopify/react-native-skia";

import { ProgressBar } from "@/components/screens/statistics/progressBar";
import sf from "../../../../assets/fonts/SF-Pro-Display-Bold.otf";
import { NumericProgressText } from "./progressText";

interface Props {
  width: number;
  height: number;
  percentage: number;
  color?: string;
}

function ProgressCard({ percentage, width, height, color }: Props) {
  const font = useFont(sf, 14);
  const { colorScheme } = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "#1A3B34";
  const backColor = colorScheme === "dark" ? "#2A3C44" : "#E4E9F3";
  let numericX;

  if (percentage >= 0 && percentage < 10) {
    numericX = width - 22;
  } else if (percentage >= 10 && percentage <= 99) {
    numericX = width - 30;
  } else {
    numericX = width - 37;
  }

  if (!font) return null;

  return (
    <Canvas style={{ width, height }}>
      <ProgressBar
        percentage={percentage}
        x={8}
        y={height - 8}
        width={width - 16}
        backColor={backColor}
        color={color}
      />
      <NumericProgressText
        x={numericX} // 1 digit
        y={15}
        start={22}
        end={percentage}
        font={font}
        renderer={function (s) {
          "worklet";
          return `${s.toFixed(0)}%`;
        }}
        color={color}
      />
      <Text
        x={3}
        y={15}
        text={"Weekly Progress"}
        font={font}
        color={textColor}
      />
    </Canvas>
  );
}

export default ProgressCard;
