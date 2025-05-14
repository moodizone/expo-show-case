import { SkPoint } from "@shopify/react-native-skia";

// points must be sorted based on 'x' (binary search)
export function findNearestPoint<T extends SkPoint>(
  sortedPoints: T[],
  x: number
): T {
  let low = 0;
  let high = sortedPoints.length - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (sortedPoints[mid].x < x) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  // after binary search, low is the closest *greater-or-equal* point
  const left = sortedPoints[Math.max(0, low - 1)];
  const right = sortedPoints[Math.min(sortedPoints.length - 1, low)];

  // return the nearest of the two
  return Math.abs(left.x - x) < Math.abs(right.x - x) ? left : right;
}
