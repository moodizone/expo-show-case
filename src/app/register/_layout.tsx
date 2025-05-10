import * as React from "react";
import { Stack } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema } from "@/validations/auth";

export type FormValues = z.infer<typeof signUpSchema>;

function RegisterLayout() {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    mode: "onBlur",
    shouldFocusError: false,
    resolver: zodResolver(signUpSchema),
  });

  return (
    <FormProvider {...methods}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="phone" />
        <Stack.Screen name="password" />
        <Stack.Screen name="faceId" />
        <Stack.Screen
          name="modal/2fa"
          options={{
            presentation: "transparentModal",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="modal/faceId"
          options={{
            presentation: "transparentModal",
            animation: "fade",
          }}
        />
      </Stack>
    </FormProvider>
  );
}

export default RegisterLayout;
