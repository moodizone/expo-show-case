import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

import img from "../../../assets/images/nl.png";
import AuthLayout from "@/components/screens/auth/layout";
import Input from "@/components/input";
import { FormValues } from "@/app/register/_layout";
import Footer from "@/components/screens/auth/footer";
import { ROUTES } from "@/routes";

function Password() {
  const {
    formState: { errors },
    control,
  } = useFormContext<FormValues>();
  const router = useRouter();
  return (
    <AuthLayout title="Sign up" description={"to start working"}>
      <View>
        <View className="flex-row gap-x-3 items-start">
          <View className="flex-grow-0 mt-1">
            <TouchableOpacity
              className={`w-[120px] h-[48px] bg-meadow-50 dark:bg-meadow-800 rounded-[12px] 
              p-2 flex-row items-center gap-x-3 justify-center`}
            >
              <View className="w-5 h-4 overflow-hidden rounded-[3px]">
                <Image
                  alt={"country flag"}
                  source={img}
                  contentFit="cover"
                  style={{ flex: 1 }}
                />
              </View>
              <Text className="text-meadow-300 font-regular text-[18px]">
                {"+31"}
              </Text>
              <FontAwesome6 name="angle-down" size={16} color="#3DD598" />
            </TouchableOpacity>
          </View>
          <View className="flex-grow">
            <Controller
              control={control}
              render={({ field: { ref, onChange, ...others } }) => (
                <Input
                  {...others}
                  onChangeText={onChange}
                  placeholder="Your phone number"
                  className="mb-9"
                  autoCorrect={false}
                  keyboardType="number-pad"
                  error={errors.phone?.message}
                />
              )}
              name="phone"
            />
          </View>
        </View>
        <View className="mt-16">
          <Footer
            backHandler={() => {
              router.dismissTo(ROUTES.register.password);
            }}
            nextHandler={() => router.push(ROUTES.register.modal.twoFA)}
          />
        </View>
      </View>
    </AuthLayout>
  );
}

export default Password;
