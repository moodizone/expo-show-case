import { Circle, Group } from "@shopify/react-native-skia";

interface BulletPointsProps {
  cx: number;
  cy: number;
  radius?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
}
export function BulletPoint({
  cx,
  cy,
  radius = 5,
  strokeWidth = 2,
  strokeColor = "#3DD598",
  fillColor = "white",
}: BulletPointsProps) {
  return (
    <Group>
      <Circle cx={cx} cy={cy} r={radius} color={fillColor} />
      <Circle
        cx={cx}
        cy={cy}
        r={radius}
        color={strokeColor}
        style="stroke"
        strokeWidth={strokeWidth}
      />
    </Group>
  );
}
