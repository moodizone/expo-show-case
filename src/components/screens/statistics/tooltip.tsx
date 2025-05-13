import React from "react";
import { Group, RoundedRect, Text, useFont } from "@shopify/react-native-skia";

type TooltipProps = {
  x: number;
  y: number;
  text: string;
  font: ReturnType<typeof useFont>;
  radius?: number;
  backgroundColor?: string;
  textColor?: string;
};
const paddingX = 12;
const paddingY = 6;

export function Tooltip({
  x,
  y,
  text,
  font,
  backgroundColor = "#3DD598",
  textColor = "#fff",
}: TooltipProps) {
  if (!font) return null;

  const { height, width } = font.measureText(text);
  const boxWidth = width + paddingX * 2;
  const boxHeight = height + paddingY * 2;

  // Convert values whether static or animated
  const get = (val: number) => (typeof val === "number" ? val : val);

  const cx = get(x);
  const cy = get(y);

  const rectX = cx - boxWidth / 2;
  // place above bullet
  const rectY = cy - boxHeight - 10;
  const textX = cx - width / 2;
  const textY = rectY + paddingY + height - 1;

  return (
    <Group>
      <RoundedRect
        x={rectX}
        y={rectY}
        width={boxWidth}
        height={boxHeight}
        r={8}
        color={backgroundColor}
      />
      <Text x={textX} y={textY} text={text} font={font} color={textColor} />
    </Group>
  );
}
