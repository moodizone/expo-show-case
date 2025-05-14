import React from "react";
import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";

interface Dp {
  color: string;
  percentage: number;
}

interface CircularProgressProps {
  size: number;
  strokeWidth?: number;
  emptyColor?: string;
  data: Dp[];
}

interface RingProps {
  percentage: number;
  cx: number;
  cy: number;
  r: number;
  strokeWidth?: number;
  emptyColor?: string;
  progressColor?: string;
}

const THRESHOLD = 97;

export function Ring({
  percentage,
  cx,
  cy,
  r,
  emptyColor = "#E4E9F3",
  strokeWidth = 8,
  progressColor = "#3DD598",
}: RingProps) {
  const animatedEnd = useSharedValue(0);
  const fullCirclePath = Skia.Path.Make();
  fullCirclePath.addCircle(cx, cy, r);

  React.useEffect(() => {
    let end = 0;

    // better visualization for very high percentage
    if (percentage >= 0 && percentage < THRESHOLD) {
      end = percentage / 100;
    } else if (percentage >= THRESHOLD && percentage < 100) {
      end = THRESHOLD / 100;
    } else if (percentage >= 100) {
      end = 1;
    }

    animatedEnd.set(
      withTiming(end, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  return (
    <>
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        color={emptyColor}
        style="stroke"
        strokeWidth={strokeWidth}
      />
      <Path
        path={fullCirclePath}
        color={progressColor}
        style="stroke"
        strokeWidth={strokeWidth}
        strokeCap="round"
        start={0}
        end={animatedEnd}
        // rotate to start from 12 o'clock
        transform={[{ rotate: -Math.PI / 2 }]}
        origin={{ x: cx, y: cy }}
      />
    </>
  );
}

// in multi-ring, only rerender apply to corresponding ring
const MemoRing = React.memo(Ring);

function CircularProgressBar({
  size,
  data,
  strokeWidth = 8,
  emptyColor = "#E4E9F3",
}: CircularProgressProps) {
  const radius = size / 2 - strokeWidth / 2;
  const cx = (size + strokeWidth) / 2;
  const cy = (size + strokeWidth) / 2;

  return (
    <Canvas
      style={{
        width: size + strokeWidth,
        height: size + strokeWidth,
      }}
    >
      {data
        .map(({ color, percentage }, i) => {
          const r = radius - i * strokeWidth * 2;

          return r < strokeWidth * 2 ? null : (
            <MemoRing
              key={i}
              percentage={percentage}
              cx={cx}
              cy={cy}
              r={r}
              strokeWidth={strokeWidth}
              emptyColor={emptyColor}
              progressColor={color ?? "#FACC15"}
            />
          );
        })
        .filter(Boolean)}
    </Canvas>
  );
}

export default CircularProgressBar;
