import * as React from "react";
import { Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link, useRouter } from "expo-router";
import { z } from "zod";
import { useColorScheme } from "nativewind";

import AuthLayout from "@/components/screens/auth/layout";
import Input from "@/components/input";
import LabelIcon from "@/components/screens/auth/labelIcon";
import { loginSchema } from "@/validations/auth";
import { Button } from "@/components/button";
import { ROUTES } from "@/routes";

export type FormValues = z.infer<typeof loginSchema>;

function Login() {
  const {
    formState: { errors },
    control,
  } = useForm<FormValues>();
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  return (
    <AuthLayout title="Welcome!" description="Sign in to continue">
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
                  placeholder="Email address"
                  className="mb-9"
                  error={errors.email?.message}
                  returnKeyType="next"
                  keyboardType="email-address"
                />
              )}
              name="email"
            />
          </View>
        </View>
        <View className="flex-row gap-x-2.5 items-start">
          <View className="flex-grow-0">
            <LabelIcon
              variant="red"
              icon={<FontAwesome6 name="lock" size={16} color="#FF575F" />}
            />
          </View>
          <View className="flex-grow">
            <Controller
              control={control}
              render={({ field: { ref, onChange, ...others } }) => (
                <Input
                  {...others}
                  onChangeText={onChange}
                  placeholder="Your password"
                  error={errors.password?.message}
                  secureToggle
                  secureTextEntry
                />
              )}
              name="password"
            />
          </View>
        </View>
        <View className="mt-16">
          <Button
            // onPress={nextHandler}
            shadow={{ color: "#0FDA89", opacity: 0.3 }}
            className="flex-row gap-x-3 items-center justify-center"
          >
            <Text className="text-[16px] leading-[18px] font-bold text-white">
              {"Sign in"}
            </Text>
            <FontAwesome6 name="arrow-right-long" size={20} color="#fff" />
          </Button>
          <Link
            className="mt-4 text-gray-300 dark:text-gray-200 text-[14px] leading-[24px] font-medium text-center"
            href={ROUTES.register.root}
          >
            {"Forgot password?"}
          </Link>
          <Button
            onPress={() => router.push(ROUTES.register.root)}
            bgColor={colorScheme === "dark" ? "#286053" : "#D4F5E9"}
            className="flex-row gap-x-3 items-center justify-center mt-12"
          >
            <Text className="text-[16px] leading-[18px] font-bold text-meadow-300">
              {"Create an account"}
            </Text>
          </Button>
        </View>
      </View>
    </AuthLayout>
  );
}

export default Login;
