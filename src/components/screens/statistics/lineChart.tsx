import * as React from "react";
import {
  Blur,
  Canvas,
  Color,
  DashPathEffect,
  Group,
  Line,
  LinearGradient,
  Path,
  PathDef,
  SkFont,
  SkPath,
  SkPoint,
  Skia,
  Text as SkiaText,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import { extent } from "d3-array";
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { line as d3Line, area as d3Area, curveCatmullRom } from "d3-shape";
import { scaleLinear } from "d3-scale";

import sf from "../../../../assets/fonts/SF-Pro-Display-Regular.otf";
import { Tooltip } from "@/components/screens/statistics/tooltip";
import { BulletPoint } from "@/components/screens/statistics/bullet";

interface LinePathProps {
  color?: string;
  path: PathDef;
  blur?: number;
  strokeWidth?: number;
}
interface AreaPathProps {
  start: SkPoint;
  end: SkPoint;
  colors?: Color[];
  path: SkPath;
}
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
interface LineChartProps {
  data: { x: number; y: number }[];
  width: number;
  height: number;
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  grid?: {
    color: string;
    count: number;
  };
  accent?: string;
  gradient?: string[];
  fontSize?: number;
  labelColor?: string;
  onTap?(point: SkPoint): void;
}
interface ChartPoint extends SkPoint {
  original: SkPoint;
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
      <SkiaText x={x} y={y} text={text} font={font} color={textColor} />
    </React.Fragment>
  );
}
export function LinePath({
  path,
  color = "#3DD598",
  blur = 4,
  strokeWidth = 2,
}: LinePathProps) {
  const blurColor = `${color}88`;
  const animationLine = useSharedValue(0);

  React.useEffect(() => {
    animationLine.set(withTiming(1, { duration: 1500 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Group>
      <Path
        path={path}
        color={color}
        style="stroke"
        strokeWidth={strokeWidth}
        start={0}
        end={animationLine}
      />
      <Path
        path={path}
        color={blurColor}
        style="stroke"
        strokeWidth={strokeWidth}
        start={0}
        end={animationLine}
      >
        <Blur blur={blur} mode="decal" />
      </Path>
    </Group>
  );
}
export function AreaPath({
  end,
  start,
  colors = ["#3DD598ff", "#3DD59805"],
  path,
}: AreaPathProps) {
  return (
    <Path path={path}>
      <LinearGradient start={start} end={end} colors={colors} />
    </Path>
  );
}
export function LineChart({
  data,
  height,
  width,
  grid,
  onTap,
  accent = "#3DD598",
  gradient,
  fontSize = 12,
  labelColor = "#899A96",
  padding,
}: LineChartProps) {
  const pd = {
    top: padding?.top ?? 35,
    left: padding?.left ?? 20,
    right: padding?.right ?? 20,
    bottom: padding?.bottom ?? 20,
  };
  const chartWidth = width - pd.left - pd.right;
  const chartHeight = height - pd.top - pd.bottom;
  const font = useFont(sf, fontSize);
  const [selectedPoint, setSelectedPoint] = React.useState<ChartPoint | null>(
    null
  );
  const gridCount = grid?.count ?? 4;
  const gridColor = grid?.color ?? "#E4E9F3";

  // normalize data
  const xBounds = extent(data, (d) => d.x) as [number, number];
  const yBounds = extent(data, (d) => d.y) as [number, number];
  const xScale = scaleLinear().domain(xBounds).range([0, chartWidth]);
  const yScale = scaleLinear()
    .domain(yBounds)
    .nice(gridCount)
    .range([chartHeight, 0]);
  const points = data.map((d) => ({
    x: xScale(d.x) + pd.left,
    y: yScale(d.y) + pd.top,
    original: d,
  }));
  const yTicks = yScale.ticks(gridCount);
  const lineGenerator = d3Line<{ x: number; y: number }>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curveCatmullRom);
  const areaGenerator = d3Area<{ x: number; y: number }>()
    .x((d) => d.x)
    .y0(chartHeight + pd.top)
    .y1((d) => d.y)
    .curve(curveCatmullRom);

  // create smooth line path
  const lineSVGPath = lineGenerator(points);
  const linePath = lineSVGPath && Skia.Path.MakeFromSVGString(lineSVGPath);

  // create area path under curve
  const areaSVGPath = areaGenerator(points);
  const areaPath =
    areaSVGPath && gradient && Skia.Path.MakeFromSVGString(areaSVGPath);

  //================================
  // Handlers
  //================================
  function handleGestureEvent(e: PanGestureHandlerEventPayload) {
    "worklet";

    // find the closest point by comparing touch X with all point.x
    const nearest = points.reduce((prev, curr) =>
      Math.abs(curr.x - e.x) < Math.abs(prev.x - e.x) ? curr : prev
    );

    runOnJS(setSelectedPoint)(nearest);
  }
  const pan = Gesture.Pan().onBegin(handleGestureEvent);

  React.useEffect(() => {
    if (selectedPoint && onTap) {
      onTap(selectedPoint);
    }
  }, [onTap, selectedPoint]);

  //================================
  // Subcomponents
  //================================
  const gridLines = yTicks.map((tick, i) => {
    const y = yScale(tick) + pd.top;

    return (
      <GridLine
        key={`grid-${i}`}
        p1={{ x: pd.left, y }}
        p2={{ x: width - pd.right, y }}
        text={`${tick / 1000}k`}
        x={fontSize / 3}
        y={y + fontSize / 3}
        font={font}
        textColor={labelColor}
        lineColor={gridColor}
      />
    );
  });

  //================================
  // Render
  //================================
  if (!font) return null;

  return (
    <GestureDetector gesture={pan}>
      <Canvas
        style={{
          width,
          height,
        }}
        className="bg-white dark:bg-gray-700"
      >
        {grid ? gridLines : null}
        {linePath ? <LinePath path={linePath} color={accent} /> : null}
        {areaPath && gradient ? (
          <AreaPath
            path={areaPath}
            start={vec(pd.left, pd.top)}
            end={vec(pd.left, pd.top + chartHeight)}
            colors={gradient}
          />
        ) : null}
        {selectedPoint ? (
          <>
            <BulletPoint
              cx={selectedPoint?.x}
              cy={selectedPoint?.y}
              strokeColor={accent}
            />
            <Tooltip
              x={selectedPoint?.x}
              y={selectedPoint?.y}
              text={`${selectedPoint.original.y}`}
              font={font}
              backgroundColor={accent}
              textColor={"#fff"}
            />
          </>
        ) : null}
      </Canvas>
    </GestureDetector>
  );
}
