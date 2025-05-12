import * as React from "react";
import { Text } from "react-native";

import ScreenProvider from "@/components/hoc/ScreenProvider";

function NotFound() {
  return (
    <ScreenProvider>
      <Text>404 goes here</Text>
    </ScreenProvider>
  );
}

export default NotFound;
