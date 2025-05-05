import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";

export function ThemeProvider({ children }: React.PropsWithChildren) {
  //================================
  // Init
  //================================
  const { setColorScheme } = useColorScheme();
  const [isSet, setIsSet] = React.useState(false);

  //================================
  // Handlers
  //================================
  React.useEffect(() => {
    if (!isSet) {
      getThemeFn()
        .then((t) => {
          setColorScheme(t === "dark" ? "dark" : "light");
        })
        .finally(() => {
          setIsSet(true);
        });
    }
  }, [isSet, setColorScheme]);
  React.useEffect(() => {
    if (isSet) {
      SplashScreen.hideAsync();
    }
  }, [isSet]);

  //================================
  // Render
  //================================
  return children;
}
export async function getThemeFn() {
  const theme = await AsyncStorage.getItem("theme");
  return theme;
}
export async function setThemeFn(theme: "light" | "dark") {
  await AsyncStorage.setItem("theme", theme);
}
