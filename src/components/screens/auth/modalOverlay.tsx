import * as React from "react";
import { Pressable, TouchableWithoutFeedback, View } from "react-native";

interface Props {
  position?: "top" | "center" | "bottom";
  onBackdrop?(): void;
}

const positions = {
  top: "justify-start",
  center: "justify-center",
  bottom: "justify-end",
};

function ModalOverlay({
  children,
  position = "center",
  onBackdrop,
}: React.PropsWithChildren<Props>) {
  return (
    <Pressable
      className={`flex-1 ${positions[position]} bg-[#31373666] dark:bg-[#22343C66]`}
      onPress={() => {
        if (onBackdrop) {
          onBackdrop();
        }
      }}
    >
      <View className={`${positions[position]} items-center `}>
        <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
      </View>
    </Pressable>
  );
}

export default ModalOverlay;
