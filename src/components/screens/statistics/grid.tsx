import * as React from "react";
import {
  DashPathEffect,
  Line,
  SkFont,
  SkPoint,
  Text,
} from "@shopify/react-native-skia";

interface GridLineProps {
  p1: SkPoint;
  p2: SkPoint;
  text: string;
  x: number;
  y: number;
  font: SkFont | null;
  lineColor?: string;
  textColor?: string;
  strokeWidth?: number;
}

export function GridLine({
  p1,
  p2,
  text,
  x,
  y,
  font,
  lineColor = "#E4E9F3",
  textColor = "#E4E9F3",
  strokeWidth = 1,
}: GridLineProps) {
  return (
    <React.Fragment>
      <Line
        p1={p1}
        p2={p2}
        color={lineColor}
        strokeWidth={strokeWidth}
        strokeJoin="round"
        style="stroke"
      >
        <DashPathEffect intervals={[6, 6]} phase={0} />
      </Line>
      <Text x={x} y={y} text={text} font={font} color={textColor} />
    </React.Fragment>
  );
}
