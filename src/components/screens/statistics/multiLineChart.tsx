import * as React from "react";
import {
  Canvas,
  SkFont,
  SkPath,
  SkPoint,
  Skia,
} from "@shopify/react-native-skia";
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { line as d3Line, curveCatmullRom } from "d3-shape";

import { findNearestPoint } from "@/components/screens/statistics/utils";
import { BulletPoint } from "@/components/screens/statistics/bullet";
import {
  ChartPoint,
  LinePath,
} from "@/components/screens/statistics/lineChart";
import { Tooltip } from "@/components/screens/statistics/tooltip";

interface MChartPoint extends ChartPoint {
  id: string;
}

interface MultiLineChartProps {
  data: Record<string, SkPoint[]>;
  width: number;
  height: number;
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  font: SkFont;
  visibleLines?: Record<string, boolean>;
  colorMap?: Record<string, string>;
  onSelect?: (point: MChartPoint) => void;
}

interface SeriesMeta {
  id: string;
  points: ChartPoint[];
  path: SkPath;
  color: string;
}

const lineGenerator = d3Line<SkPoint>()
  .x((d) => d.x)
  .y((d) => d.y)
  .curve(curveCatmullRom);

export function MultiLineChart({
  data,
  width,
  height,
  padding,
  visibleLines,
  font,
  colorMap = {},
  onSelect,
}: MultiLineChartProps) {
  //================================
  // Init
  //================================
  const pd = {
    top: padding?.top ?? 35,
    left: padding?.left ?? 20,
    right: padding?.right ?? 20,
    bottom: padding?.bottom ?? 20,
  };
  const [selectedPoint, setSelectedPoint] = React.useState<MChartPoint | null>(
    null
  );
  const chartWidth = width - pd.left - pd.right;
  const chartHeight = height - pd.top - pd.bottom;
  const allPoints = React.useMemo(() => {
    return Object.values(data).flat();
  }, [data]);
  const xScale = React.useMemo(() => {
    const xExtent = extent(allPoints, (d) => d.x) as [number, number];
    return scaleLinear()
      .domain(xExtent)
      .range([pd.left, pd.left + chartWidth]);
  }, [allPoints, chartWidth, pd.left]);
  const yScale = React.useMemo(() => {
    const yExtent = extent(allPoints, (d) => d.y) as [number, number];
    return scaleLinear()
      .domain(yExtent)
      .range([pd.top + chartHeight, pd.top]);
  }, [allPoints, chartHeight, pd.top]);
  const series = React.useMemo(() => {
    return (
      Object.entries(data)
        .filter(([id]) => visibleLines?.[id] ?? true)
        .map(([id, points]) => {
          const transformed = [...points]
            .map((p) => ({
              x: xScale(p.x),
              y: yScale(p.y),
              original: p,
            }))
            .sort((a, b) => a.x - b.x);

          const svgPath = lineGenerator(transformed);
          const path = svgPath ? Skia.Path.MakeFromSVGString(svgPath) : null;

          return path
            ? {
                id,
                points: transformed,
                path,
                color: colorMap[id] ?? "#3DD598",
              }
            : null;
        })
        // filter null
        .filter(Boolean) as SeriesMeta[]
    );
  }, [data, visibleLines, xScale, yScale, colorMap]);

  //================================
  // Handlers
  //================================
  function handleGestureEvent(e: PanGestureHandlerEventPayload) {
    "worklet";
    runOnJS(findClosestPoint)(e.x, e.y);
  }
  function findClosestPoint(x: number, y: number) {
    let minDistance = Infinity;
    let selected: MChartPoint | null = null;

    for (const { id, points } of series) {
      const nearest = findNearestPoint(points, x);
      const dist = Math.abs(nearest.y - y);

      if (dist < minDistance) {
        minDistance = dist;
        selected = { ...nearest, id };
      }
    }

    if (
      selected &&
      (selectedPoint?.id !== selected.id || selectedPoint?.x !== selected.x)
    ) {
      setSelectedPoint(selected);
      onSelect?.(selected);
    }
  }

  const pan = Gesture.Pan().onBegin(handleGestureEvent);

  //================================
  // Render
  //================================
  return (
    <GestureDetector gesture={pan}>
      <Canvas style={{ width, height }}>
        {series.map(({ id, path, color }) => (
          <LinePath key={id} path={path} color={color} />
        ))}
        {selectedPoint ? (
          <>
            <BulletPoint
              cx={selectedPoint.x}
              cy={selectedPoint.y}
              strokeColor={colorMap[selectedPoint.id] ?? "#3DD598"}
            />
            <Tooltip
              x={selectedPoint.x}
              y={selectedPoint.y}
              text={`${selectedPoint.original.y}`}
              font={font}
              backgroundColor={colorMap[selectedPoint.id] ?? "black"}
              textColor={"#fff"}
              canvasWidth={width}
            />
          </>
        ) : null}
      </Canvas>
    </GestureDetector>
  );
}
