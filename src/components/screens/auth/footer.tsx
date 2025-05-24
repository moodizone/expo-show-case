import * as React from "react";
import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { FontAwesome6 } from "@expo/vector-icons";

import { Button, IconButton } from "@/components/button";

interface Props {
  backHandler?(): void;
  nextHandler?(): void;
}

function Footer({ backHandler, nextHandler }: Props) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row gap-3">
      <View className="flex-grow-0">
        <IconButton
          onPress={backHandler}
          bgColor={colorScheme === "dark" ? "#286053" : "#D4F5E9"}
          icon={
            <FontAwesome6 name="arrow-left-long" size={20} color="#3DD598" />
          }
        />
      </View>
      <View className="flex-grow">
        <Button
          bgColor="#3DD598"
          onPress={nextHandler}
          shadow={{ color: "#0FDA89", opacity: 0.3 }}
          className="flex-row gap-x-3 items-center justify-center"
        >
          <Text className="text-[16px] leading-[18px] font-bold text-white">
            {"Next"}
          </Text>
          <FontAwesome6 name="arrow-right-long" size={20} color="#fff" />
        </Button>
      </View>
    </View>
  );
}

export default Footer;
