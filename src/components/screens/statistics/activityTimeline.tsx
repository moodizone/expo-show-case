import * as React from "react";
import { Canvas, useFont } from "@shopify/react-native-skia";

import { StackedBar } from "@/components/screens/statistics/stackedBar";
import sfr from "../../../../assets/fonts/SF-Pro-Display-Regular.otf";
import sfh from "../../../../assets/fonts/SF-Pro-Display-Heavy.otf";

export interface ActivityType {
  day: string;
  weekday: string;

  // in range of [0,1]
  // total should not exceed 1
  upper: number;
  bottom: number;
}

interface TimeLineProps {
  data: ActivityType[];
  width: number;
  height: number;
  backColor?: string;
  upperColor?: string;
  bottomColor?: string;
  weekdayColor?: string;
  dayColor?: string;
}

const padding = 10;
const stackWidth = 40;

function ActivityTimeline({
  data,
  height,
  width,
  backColor,
  bottomColor,
  upperColor,
  dayColor,
  weekdayColor,
}: TimeLineProps) {
  const chartWidth = width;
  const chartHeight = height - padding * 2;
  const minY = padding;
  const maxY = padding + chartHeight;
  const fr = useFont(sfr, 10);
  const fh = useFont(sfh, 12);

  if (!fr || !fh) return null;

  return (
    <Canvas style={{ width, height }}>
      {data
        .map((s, index) => {
          const x = index * stackWidth;

          if (x + stackWidth > chartWidth) return null;

          return (
            <StackedBar
              key={index}
              x={x}
              dayText={s.day}
              weekendText={s.weekday}
              upper={s.upper}
              bottom={s.bottom}
              fr={fr}
              fh={fh}
              minY={minY}
              maxY={maxY}
              backColor={backColor}
              upperColor={upperColor}
              bottomColor={bottomColor}
              dayColor={dayColor}
              weekdayColor={weekdayColor}
              stackWidth={stackWidth}
            />
          );
        })
        .filter(Boolean)}
    </Canvas>
  );
}

export default ActivityTimeline;
