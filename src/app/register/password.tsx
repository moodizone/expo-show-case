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

function Password() {
  const {
    formState: { errors },
    getValues,
    control,
  } = useFormContext<FormValues>();
  const router = useRouter();
  const { name } = getValues();

  return (
    <AuthLayout title="Hello!" description={name}>
      <View>
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
                  placeholder="Create password"
                  className="mb-9"
                  secureTextEntry
                  secureToggle
                  autoCorrect={false}
                  error={errors.password?.message}
                  returnKeyType="next"
                />
              )}
              name="password"
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
                  placeholder="Repeat your password"
                  secureTextEntry
                  secureToggle
                  autoCorrect={false}
                  error={errors.confirmPassword?.message}
                />
              )}
              name="confirmPassword"
            />
          </View>
        </View>
        <View className="mt-16">
          <Footer
            backHandler={() => {
              router.dismissTo(ROUTES.register.root);
            }}
            nextHandler={() => router.push(ROUTES.register.phone)}
          />
        </View>
      </View>
    </AuthLayout>
  );
}

export default Password;
