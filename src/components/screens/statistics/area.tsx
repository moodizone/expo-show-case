import {
  Color,
  LinearGradient,
  Path,
  SkPath,
  SkPoint,
} from "@shopify/react-native-skia";
import { area, curveCatmullRom } from "d3-shape";

interface AreaPathProps {
  start: SkPoint;
  end: SkPoint;
  colors?: Color[];
  path: SkPath;
}

export function areaGenerator(y0: number) {
  return area<SkPoint>()
    .x((d) => d.x)
    .y0(y0)
    .y1((d) => d.y)
    .curve(curveCatmullRom);
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
