import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";
import { useQueryClient } from "@tanstack/react-query";

import ScreenProvider from "@/hoc/ScreenProvider";
import { ROUTES } from "@/routes";

function Login() {
  const qc = useQueryClient();
  const router = useRouter();
  async function sett() {
    await AsyncStorage.setItem("token", "token");
    qc.setQueryData(["auth"], true);
    router.push(ROUTES.home);
  }
  return (
    <ScreenProvider>
      <Text className="p-4 bg-red-300">login page goes here</Text>
      <Button title="login" onPress={sett} />
    </ScreenProvider>
  );
}

export default Login;
