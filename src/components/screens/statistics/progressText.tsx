import * as React from "react";
import { SkFont, Text } from "@shopify/react-native-skia";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ProgressTextProps {
  x: number;
  y: number;
  start: number;
  end: number;

  /**
   * worklet function
   */
  renderer?(s: number): string;
  font: SkFont;
  color?: string;
}

export function NumericProgressText({
  font,
  x,
  y,
  color,
  start,
  end,
  renderer,
}: ProgressTextProps) {
  const sharedStart = useSharedValue(start);
  const targetText = useDerivedValue(() =>
    renderer ? renderer(sharedStart.value) : `${sharedStart.value}`
  );

  React.useEffect(() => {
    sharedStart.set(
      withTiming(end, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]);

  return <Text x={x} y={y} text={targetText} font={font} color={color} />;
}
