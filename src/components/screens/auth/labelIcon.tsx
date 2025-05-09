import { useColorScheme } from "nativewind";
import * as React from "react";
import { View } from "react-native";

type Variant = "red" | "yellow";
interface Props {
  icon: React.ReactNode;
  variant?: Variant;
}

function LabelIcon({ icon, variant = "yellow" }: Props) {
  const { colorScheme } = useColorScheme();
  let bg;

  switch (variant) {
    case "red":
      bg = colorScheme === "dark" ? "#623A42" : "#FFE5E7";
      break;
    default:
      bg = colorScheme === "dark" ? "#625B39" : "#FEF3D9";
  }

  return (
    <View
      className="w-[38px] h-[48px] rounded-[12px] justify-center items-center"
      style={{ backgroundColor: bg }}
    >
      {icon}
    </View>
  );
}

export default LabelIcon;
