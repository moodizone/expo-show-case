import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Loading from "@/components/loading";
import { checkAuthStatus } from "@/services/auth";

function AuthProvider({ children }: React.PropsWithChildren) {
  const { isLoading } = useQuery({
    queryKey: ["auth"],
    async queryFn() {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const result = await checkAuthStatus(token);
        return result.success;
      }

      return false;
    },
  });

  if (isLoading) return <Loading />;

  return children;
}

export default AuthProvider;
