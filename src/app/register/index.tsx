import * as React from "react";
import { View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";

import AuthLayout from "@/components/screens/auth/layout";
import Input from "@/components/input";
import { FormValues } from "@/app/register/_layout";
import Footer from "@/components/screens/auth/footer";
import LabelIcon from "@/components/screens/auth/labelIcon";
import { ROUTES } from "@/routes";

function RegisterRoot() {
  const {
    formState: { errors },
    control,
  } = useFormContext<FormValues>();
  const router = useRouter();

  return (
    <AuthLayout title="Hello!" description="lets introduce">
      <View>
        <View className="flex-row gap-x-2.5 items-start">
          <View className="flex-grow-0">
            <LabelIcon
              icon={
                <FontAwesome6 name="user-large" size={16} color="#FFC542" />
              }
            />
          </View>
          <View className="flex-grow">
            <Controller
              control={control}
              render={({ field: { ref, onChange, ...others } }) => (
                <Input
                  {...others}
                  onChangeText={onChange}
                  placeholder="Your full name"
                  className="mb-9"
                  error={errors.name?.message}
                  returnKeyType="next"
                />
              )}
              name="name"
            />
          </View>
        </View>
        <View className="flex-row gap-x-2.5 items-start">
          <View className="flex-grow-0">
            <LabelIcon
              icon={
                <FontAwesome6 name="user-large" size={16} color="#FFC542" />
              }
            />
          </View>
          <View className="flex-grow">
            <Controller
              control={control}
              render={({ field: { ref, onChange, ...others } }) => (
                <Input
                  {...others}
                  onChangeText={onChange}
                  placeholder="Email address"
                  error={errors.email?.message}
                  keyboardType="email-address"
                />
              )}
              name="email"
            />
          </View>
        </View>
        <View className="mt-16">
          <Footer
            backHandler={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.push(ROUTES.login);
              }
            }}
            nextHandler={() => router.push(ROUTES.register.password)}
          />
        </View>
      </View>
    </AuthLayout>
  );
}

export default RegisterRoot;
