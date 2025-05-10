import { router } from "expo-router";
import { View } from "react-native";

import ModalOverlay from "@/components/screens/auth/modalOverlay";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Modal() {
  return (
    <ModalOverlay
      position="center"
      onBackdrop={() => {
        router.dismiss();
      }}
    >
      <View className="justify-center items-center rounded-[18px] bg-white w-[140px] h-[140px]">
        <FontAwesome6 name="face-smile-beam" size={60} color="#0062FF" />
      </View>
    </ModalOverlay>
  );
}
