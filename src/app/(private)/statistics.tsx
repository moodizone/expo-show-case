import * as React from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import { useFont } from "@shopify/react-native-skia";
import { useColorScheme } from "nativewind";
import { FontAwesome6 } from "@expo/vector-icons";

import sf from "../../../assets/fonts/SF-Pro-Display-Regular.otf";
import ScreenProvider from "@/components/hoc/ScreenProvider";
import Card from "@/components/card";
import CircularProgressBar from "@/components/screens/statistics/circularProgress";
import { MultiLineChart } from "@/components/screens/statistics/multiLineChart";
import { LineChart } from "@/components/screens/statistics/lineChart";
import ProgressCard from "@/components/screens/statistics/progressCard";

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
  const { width } = useWindowDimensions();

  const { colorScheme } = useColorScheme();
  const gridColor = colorScheme === "dark" ? "#475E69" : "#E4E9F3";
  const labelColor = colorScheme === "dark" ? "#96A7AF" : "#899A96";
  const strokeColor = colorScheme === "dark" ? "#2A3C44" : "#E4E9F3";
  const availableWidth = width - 30 * 2 - 24 * 2;

  if (!font) return null;

  return (
    <ScreenProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-[30px]">
        <View className="flex-1 gap-y-5 pb-10">
          <Card className="p-6" title="Statistics">
            <LineChart
              data={data}
              font={font}
              height={200}
              width={availableWidth}
              accent="#3DD598"
              gradient={["#3DD598ff", "#3DD59805"]}
              grid={{
                color: gridColor,
                count: 4,
              }}
              labelColor={labelColor}
              padding={{ left: 30, right: 0 }}
            />
          </Card>
          <Card className="p-6" title="Statistics">
            <MultiLineChart
              data={mData}
              colorMap={{ line1: "#FF575F", line2: "#FFC542" }}
              font={font}
              height={200}
              width={availableWidth}
              padding={{ left: 10, right: 0 }}
            />
          </Card>
          <Card className="p-6 flex-row gap-x-4">
            <CircularProgressBar
              data={cpd}
              strokeWidth={7}
              size={100}
              emptyColor={strokeColor}
            />
            <View>
              <Text className="text-meadow-1000 dark:text-white font-bold text-[18px] leading-[24px]">
                {"Weekly progress"}
              </Text>
              <View className="mt-4">
                <View className="flex-row gap-2 items-center">
                  <View className="w-[15px] h-[10px] rounded-[6px] bg-sunglow-300" />
                  <Text
                    className={"text-gray-300 dark:text-gray-200 text-[14px]"}
                  >
                    {"to start working"}
                  </Text>
                </View>
                <View className="flex-row gap-x-2 items-center">
                  <View className="w-[15px] h-[10px] rounded-[6px] bg-coral-300" />
                  <Text
                    className={"text-gray-300 dark:text-gray-200 text-[14px]"}
                  >
                    {"to start working"}
                  </Text>
                </View>
                <View className="flex-row gap-x-2 items-center">
                  <View className="w-[15px] h-[10px] rounded-[6px] bg-meadow-300" />
                  <Text
                    className={"text-gray-300 dark:text-gray-200 text-[14px]"}
                  >
                    {"to start working"}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
          <Card className="p-6 flex-row gap-x-4">
            <View className="w-[70px] h-[70px] rounded-[12px] bg-coral-350 items-center justify-center">
              <FontAwesome6 name="arrow-down-long" size={24} color="#fff" />
            </View>
            <ProgressCard
              width={availableWidth - 70 - 16}
              percentage={15}
              height={70}
              color={"#FF565E"}
            />
          </Card>
          <Card className="p-6 flex-row gap-x-4">
            <View className="w-[70px] h-[70px] rounded-[12px] bg-sunglow-300 items-center justify-center">
              <FontAwesome6 name="arrow-up-long" size={24} color="#fff" />
            </View>
            <ProgressCard
              width={availableWidth - 70 - 16}
              percentage={70}
              height={70}
              color={"#FFC542"}
            />
          </Card>
        </View>
      </ScrollView>
    </ScreenProvider>
  );
}

export default Statistics;
