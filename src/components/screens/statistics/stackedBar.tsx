import * as React from "react";
import { Path, SkFont, Skia, Text } from "@shopify/react-native-skia";
import {
  Easing,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface StackedBarProps {
  x: number;
  minY: number;
  maxY: number;
  upper: number;
  bottom: number;
  stackWidth: number;
  fr: SkFont;
  fh: SkFont;
  dayText: string;
  weekendText: string;
  backColor?: string;
  upperColor?: string;
  bottomColor?: string;
  weekdayColor?: string;
  dayColor?: string;
}
const strokeWidth = 10;
const duration = 200;
const textsHeight = 40;

export function StackedBar({
  x,
  backColor,
  bottomColor = "#3DD598",
  upperColor = "#FF575F",
  dayText,
  weekendText,
  dayColor,
  weekdayColor,
  stackWidth,
  maxY,
  minY,
  bottom,
  upper,
  fr,
  fh,
}: StackedBarProps) {
  //================================
  // Init
  //================================
  const bottomSv = useSharedValue(0);
  const upperSv = useSharedValue(0);
  const centeredX = stackWidth / 2 + x;
  const maxBarY = maxY - textsHeight;
  const gap = bottom === 0 || upper === 0 ? 0 : 16;
  const maxH = maxBarY - minY - gap;
  const bottomStart = maxBarY;
  const bottomEnd = bottomStart - maxH * bottom;
  const upperStart = bottomEnd - gap;
  const upperEnd = upperStart - maxH * upper;
  const dayX = (stackWidth - fh.measureText(dayText).width) / 2 + x;
  const weekendX = (stackWidth - fr.measureText(weekendText).width) / 2 + x;

  const path = Skia.Path.Make()
    .moveTo(centeredX, maxBarY)
    .lineTo(centeredX, minY);
  const bottomPath = Skia.Path.Make()
    .moveTo(centeredX, bottomStart)
    .lineTo(centeredX, Math.max(minY, bottomEnd));
  const upperPath = Skia.Path.Make()
    .moveTo(centeredX, upperStart)
    .lineTo(centeredX, upperEnd);

  //================================
  // Handler
  //================================
  React.useEffect(() => {
    bottomSv.set(
      withTiming(1, {
        duration,
        easing: Easing.out(Easing.ease),
      })
    );
    upperSv.set(
      withDelay(
        duration,
        withTiming(1, {
          duration,
          easing: Easing.out(Easing.ease),
        })
      )
    );
  }, [bottomEnd, bottomSv, upperEnd, upperSv]);

  //================================
  // Render
  //================================
  if (!fr || !fh) return null;

  return (
    <>
      <Path
        path={path}
        color={backColor}
        style={"stroke"}
        strokeWidth={strokeWidth}
        strokeCap={"round"}
      />
      {upper ? (
        <Path
          path={upperPath}
          color={upperColor}
          style={"stroke"}
          strokeWidth={strokeWidth}
          strokeCap={"round"}
          start={0}
          end={upperSv}
        />
      ) : null}
      {bottom ? (
        <Path
          path={bottomPath}
          color={bottomColor}
          style={"stroke"}
          strokeWidth={strokeWidth}
          strokeCap={"round"}
          start={0}
          end={bottomSv}
        />
      ) : null}
      <Text font={fh} text={dayText} color={dayColor} x={dayX} y={maxY - 12} />
      <Text
        font={fr}
        text={weekendText}
        color={weekdayColor}
        x={weekendX}
        y={maxY}
      />
    </>
  );
}
