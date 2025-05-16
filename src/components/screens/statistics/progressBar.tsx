import * as React from "react";
import { Path, Skia } from "@shopify/react-native-skia";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";

interface ProgressBarProps {
  x: number;
  y: number;
  width: number;
  percentage: number;
  height?: number;
  color?: string;
  backColor?: string;
}

export function ProgressBar({
  percentage,
  width,
  x,
  y,
  backColor = "#E4E9F3",
  color = "#3DD598",
  height = 10,
}: ProgressBarProps) {
  const end = useSharedValue(0);
  const path = Skia.Path.Make();
  path.moveTo(x, y);
  path.lineTo(x + width, y);

  React.useEffect(() => {
    end.set(
      withTiming(percentage / 100, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  return (
    <>
      <Path
        path={path}
        strokeWidth={height}
        strokeCap="round"
        color={backColor}
        style={"stroke"}
      />
      <Path
        path={path}
        strokeWidth={height}
        strokeCap="round"
        color={color}
        style={"stroke"}
        start={0}
        end={end}
      />
    </>
  );
}
