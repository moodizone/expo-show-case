import React from "react";
import {
  Canvas,
  Path,
  SkFont,
  Skia,
  SkPoint,
  Text,
  useFont,
} from "@shopify/react-native-skia";

import sfh from "../../../../assets/fonts/SF-Pro-Display-Heavy.otf";

function distributeEvenly(count: number, totalHeight: number): number[] {
  const segmentHeight = totalHeight / count;
  return Array(count).fill(segmentHeight);
}
function createLineResolver(p1: SkPoint, p2: SkPoint) {
  const { x: x1, y: y1 } = p1;
  const { x: x2, y: y2 } = p2;

  if (x1 === x2) {
    // Vertical line — x is constant
    return () => x1;
  }

  const m = (y2 - y1) / (x2 - x1);
  const b = y1 - m * x1;

  return function getX(y0: number): number {
    return (y0 - b) / m;
  };
}

interface SegmentType {
  percentage: number;
  color: string;
  textColor: string;
}
interface PyramidChartProps {
  data: SegmentType[];
  width: number;
  height: number;
  startColor?: string;
  endColor?: string;
}

function PyramidChart({ data, width, height }: PyramidChartProps) {
  const font = useFont(sfh, 18);
  const padding = 10;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const strokeWidth = chartWidth / 6;
  const minH = padding + strokeWidth / 2;
  const maxH = padding + chartHeight - strokeWidth / 2;
  const center = { x: padding + chartWidth / 2, y: minH };
  const pl = { x: padding + strokeWidth / 2, y: maxH };
  const pr = { x: padding + chartWidth - strokeWidth / 2, y: maxH };
  const sorted = [...data].sort((a, b) => b.percentage - a.percentage);
  const segmentHeights = distributeEvenly(sorted.length, maxH);
  const getLX = createLineResolver(pl, center);
  const getRX = createLineResolver(pr, center);
  let accumulated = maxH;
  const slices = segmentHeights.map((h) => {
    const y = accumulated;
    accumulated -= h;
    return {
      pl: { x: getLX(y), y },
      pr: { x: getRX(y), y },
    };
  });

  //================================
  // render
  //================================
  return (
    <Canvas style={{ width, height }}>
      {slices
        .map(({ pl, pr }, index) => {
          const { color, textColor, percentage } = sorted[index];

          if (!font) return null;

          return (
            <PySlice
              key={index}
              strokeWidth={strokeWidth}
              color={color}
              center={center}
              pl={pl}
              pr={pr}
              font={font}
              textColor={textColor}
              percentage={`${percentage}%`}
            />
          );
        })
        .filter(Boolean)}
    </Canvas>
  );
}

export default PyramidChart;

interface PySliceProps {
  center: SkPoint;
  pl: SkPoint;
  pr: SkPoint;
  font: SkFont;
  percentage: string;
  strokeWidth: number;
  color?: string;
  textColor?: string;
}
function PySlice({
  center,
  pl,
  pr,
  strokeWidth,
  color,
  font,
  textColor,
  percentage,
}: PySliceProps) {
  if (!font) return null;
  const wX = font.measureText(percentage).width;
  const tX = center.x - wX / 2;

  return (
    <>
      <Path
        style={"stroke"}
        strokeWidth={strokeWidth}
        strokeCap={"round"}
        strokeJoin={"round"}
        color={color}
        path={Skia.Path.Make()
          .moveTo(center.x, center.y)
          .lineTo(pl.x, pl.y)
          .lineTo(pr.x, pr.y)
          .close()}
      />
      <Path
        style={"fill"}
        strokeWidth={strokeWidth}
        color={color}
        path={Skia.Path.Make()
          .moveTo(center.x, center.y)
          .lineTo(pl.x, pl.y)
          .lineTo(pr.x, pr.y)
          .close()}
      />
      <Text font={font} x={tX} y={pr.y} text={percentage} color={textColor} />
    </>
  );
}
