import * as React from "react";
import {
  Blur,
  Canvas,
  Group,
  Path,
  PathDef,
  SkFont,
  SkPoint,
  Skia,
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
import { line as d3Line, curveCatmullRom } from "d3-shape";
import { scaleLinear } from "d3-scale";

import { Tooltip } from "@/components/screens/statistics/tooltip";
import { BulletPoint } from "@/components/screens/statistics/bullet";
import { GridLine } from "@/components/screens/statistics/grid";
import { areaGenerator, AreaPath } from "@/components/screens/statistics/area";
import { findNearestPoint } from "@/components/screens/statistics/utils";

interface LinePathProps {
  color?: string;
  path: PathDef;
  blur?: number;
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
  font: SkFont;
  labelColor?: string;
  onTap?(point: SkPoint): void;
}
export interface ChartPoint extends SkPoint {
  original: SkPoint;
}

function lineGenerator() {
  return d3Line<SkPoint>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curveCatmullRom);
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
export function LineChart({
  data,
  height,
  width,
  grid,
  onTap,
  accent = "#3DD598",
  gradient,
  font,
  labelColor = "#899A96",
  padding,
}: LineChartProps) {
  const fontSize = font.getSize();
  const pd = {
    top: padding?.top ?? 35,
    left: padding?.left ?? 20,
    right: padding?.right ?? 20,
    bottom: padding?.bottom ?? 20,
  };
  const chartWidth = width - pd.left - pd.right;
  const chartHeight = height - pd.top - pd.bottom;
  const [selectedPoint, setSelectedPoint] = React.useState<ChartPoint | null>(
    null
  );
  const gridCount = grid?.count ?? 4;
  const gridColor = grid?.color ?? "#E4E9F3";

  // memo over callback since the output is function reference
  const yScale = React.useMemo(() => {
    const yBounds = extent(data, (d) => d.y) as [number, number];
    return scaleLinear()
      .domain(yBounds)
      .nice(gridCount)
      .range([chartHeight, 0]);
  }, [data, gridCount, chartHeight]);
  const yTicks = yScale.ticks(gridCount);

  // normalize data
  const points = React.useMemo(() => {
    const xBounds = extent(data, (d) => d.x) as [number, number];
    const xScale = scaleLinear().domain(xBounds).range([0, chartWidth]);
    return data
      .map((d) => ({
        x: xScale(d.x) + pd.left,
        y: yScale(d.y) + pd.top,
        original: d,
      }))
      .sort((a, b) => a.x - b.x);
  }, [chartWidth, data, pd.left, pd.top, yScale]);

  // create smooth line path
  const linePath = React.useMemo(() => {
    const lineSVGPath = lineGenerator()(points);
    if (lineSVGPath) {
      return Skia.Path.MakeFromSVGString(lineSVGPath);
    }
    return null;
  }, [points]);

  // create area path under curve
  const areaPath = React.useMemo(() => {
    const areaSVGPath = areaGenerator(chartHeight + pd.top)(points);

    if (areaSVGPath && gradient) {
      return Skia.Path.MakeFromSVGString(areaSVGPath);
    }
    return null;
  }, [chartHeight, pd.top, points, gradient]);

  //================================
  // Handlers
  //================================
  function findSelectedPoint(x: number) {
    const nearest = findNearestPoint(points, x);

    if (nearest.original.x !== selectedPoint?.original.x) {
      setSelectedPoint(nearest);
    }
  }
  function handleGestureEvent(e: PanGestureHandlerEventPayload) {
    "worklet";
    runOnJS(findSelectedPoint)(e.x);
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
  const gridLines = grid
    ? yTicks.map((tick, i) => {
        const y = yScale(tick) + pd.top;

        return (
          <GridLine
            key={`grid-${i}`}
            p1={{ x: pd.left, y }}
            p2={{ x: width - pd.right, y }}
            text={`${tick}`}
            x={fontSize / 3}
            y={y + fontSize / 3}
            font={font}
            textColor={labelColor}
            lineColor={gridColor}
          />
        );
      })
    : null;

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
        {gridLines}
        {linePath ? <LinePath path={linePath} color={accent} /> : null}
        {areaPath ? (
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
              canvasWidth={width}
            />
          </>
        ) : null}
      </Canvas>
    </GestureDetector>
  );
}
