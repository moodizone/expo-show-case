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
  canvasWidth: number;
};
const paddingX = 12;
const paddingY = 6;
const spacingY = 10;

export function Tooltip({
  x,
  y,
  text,
  font,
  backgroundColor = "#3DD598",
  textColor = "#fff",
  canvasWidth,
  radius = 8,
}: TooltipProps) {
  if (!font) return null;

  const { height: textHeight, width: textWidth } = font.measureText(text);
  const boxWidth = textWidth + paddingX * 2;
  const boxHeight = textHeight + paddingY * 2;

  // determine vertical placement (flip up/down)
  const placeAbove = y > boxHeight + spacingY;
  const rectY = placeAbove ? y - boxHeight - spacingY : y + spacingY;
  const textY = rectY + paddingY + textHeight - 1;

  // determine horizontal alignment (shift left/right)
  let rectX = x - boxWidth / 2;
  if (rectX < 4) rectX = 4; // prevent overflow left
  if (rectX + boxWidth > canvasWidth - 4) rectX = canvasWidth - boxWidth - 4;

  const textX = rectX + paddingX;

  return (
    <Group>
      <RoundedRect
        x={rectX}
        y={rectY}
        width={boxWidth}
        height={boxHeight}
        r={radius}
        color={backgroundColor}
      />
      <Text x={textX} y={textY} text={text} font={font} color={textColor} />
    </Group>
  );
}
