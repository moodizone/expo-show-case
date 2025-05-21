import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

import AuthLayout from "@/components/screens/auth/layout";
import Footer from "@/components/screens/auth/footer";
import { ROUTES } from "@/routes";

function FaceID() {
  const router = useRouter();
  return (
    <AuthLayout title="Face ID" description={"Enable it?"}>
      <View>
        <TouchableOpacity
          onPress={() => {
            router.push(ROUTES.register.modal.faceId);
          }}
          className="w-[90px] h-[90px] rounded-[18px] bg-cobalt-50 dark:bg-cobalt-800 justify-center items-center"
        >
          <AntDesign name="scan1" size={60} color="#0062FF" />
        </TouchableOpacity>
        <Text className="mt-6 font-regular text-[16px] leading-[22px] text-gray-300 dark:text-gray-200">
          {"Face ID will allow you to login with a \nscan of your face"}
        </Text>
        <View className="mt-16">
          <Footer
            backHandler={() => {
              router.dismiss();
            }}
            nextHandler={() => router.push(ROUTES.home)}
          />
        </View>
        <View className="mt-4">
          <Link
            href={ROUTES.home}
            className="text-[14px] leading-[24px] text-center font-medium text-[#A3A3A4]"
          >
            {"Skip Face ID"}
          </Link>
        </View>
      </View>
    </AuthLayout>
  );
}

export default FaceID;
