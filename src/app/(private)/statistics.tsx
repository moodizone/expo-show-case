import * as React from "react";
import { View } from "react-native";
import { useFont } from "@shopify/react-native-skia";
import { useColorScheme } from "nativewind";

import sf from "../../../assets/fonts/SF-Pro-Display-Regular.otf";
import ScreenProvider from "@/components/hoc/ScreenProvider";
import Card from "@/components/card";
import CircularProgressBar from "@/components/screens/statistics/circularProgress";
import { MultiLineChart } from "@/components/screens/statistics/multiLineChart";
import { LineChart } from "@/components/screens/statistics/lineChart";

const data = [
  { x: 3, y: 45 },
  { x: 1, y: 30 },
  { x: 2, y: 60 },
  { x: 4, y: 90 },
  { x: 6, y: 140 },
  { x: 7, y: 70 },
  { x: 5, y: 90 },
];
const mData = {
  line1: data,
  line2: [
    { x: 3, y: 22 },
    { x: 1, y: 45 },
    { x: 2, y: 75 },
    { x: 4, y: 33 },
    { x: 6, y: 100 },
    { x: 7, y: 90 },
    { x: 5, y: 70 },
  ],
};
const cpd = [
  { percentage: 40, color: "#3DD598" },
  { percentage: 50, color: "#FFC542" },
  { percentage: 40, color: "#FF575F" },
];

function Statistics() {
  const font = useFont(sf, 12);
  const { colorScheme } = useColorScheme();
  const gridColor = colorScheme === "dark" ? "#475E69" : "#E4E9F3";
  const labelColor = colorScheme === "dark" ? "#96A7AF" : "#899A96";
  const strokeColor = colorScheme === "dark" ? "#2A3C44" : "#E4E9F3";

  if (!font) return null;

  return (
    <ScreenProvider>
      <View className="px-[30px] gap-y-4">
        <Card className="p-6" title="Statistics">
          <LineChart
            data={data}
            font={font}
            height={200}
            width={320}
            accent="#3DD598"
            gradient={["#3DD598ff", "#3DD59805"]}
            grid={{
              color: gridColor,
              count: 4,
            }}
            labelColor={labelColor}
            padding={{ left: 30 }}
          />
        </Card>
        <Card className="p-6" title="Statistics">
          <MultiLineChart
            data={mData}
            colorMap={{ line1: "#FF575F", line2: "#FFC542" }}
            font={font}
            height={180}
            width={320}
            padding={{ left: 0 }}
          />
        </Card>
        <Card className="p-6" title="Statistics">
          <CircularProgressBar
            data={cpd}
            strokeWidth={9}
            size={120}
            emptyColor={strokeColor}
          />
        </Card>
      </View>
    </ScreenProvider>
  );
}

export default Statistics;
