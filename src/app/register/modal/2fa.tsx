import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

import ModalOverlay from "@/components/screens/auth/modalOverlay";
import { ROUTES } from "@/routes";
import OTPInput from "@/components/screens/auth/otpInput";
import { Button } from "@/components/button";

export default function Modal() {
  const router = useRouter();

  return (
    <ModalOverlay
      position="bottom"
      onBackdrop={() => {
        router.dismissTo(ROUTES.register.phone);
      }}
    >
      <View className="bg-white dark:bg-gray-700 rounded-tl-[24px] rounded-tr-[24px] px-8 py-6 w-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
        >
          <OTPInput
            onCodeFilled={(code) => console.log("2FA code entered:", code)}
          />
        </KeyboardAvoidingView>
        <Text className="mt-4 text-[16px] font-regular leading-[22px] text-gray-300 dark:text-gray-200">
          {"Please, enter 4-digit code we sent on your number as SMS"}
        </Text>
        <Button
          onPress={() => router.push(ROUTES.register.faceId)}
          shadow={{ color: "#0FDA89", opacity: 0.3 }}
          className="flex-row gap-x-3 items-center justify-center mt-4 mb-8"
        >
          <Text className="text-[16px] leading-[18px] font-bold text-white">
            {"Next"}
          </Text>
          <FontAwesome6 name="arrow-right-long" size={20} color="#fff" />
        </Button>
      </View>
    </ModalOverlay>
  );
}
