import * as React from "react";
import { Href, Link } from "expo-router";
import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";

import { ROUTES } from "@/routes";
import ScreenProvider from "@/components/hoc/ScreenProvider";
import { FontAwesome6 } from "@expo/vector-icons";

const routes = [
  {
    url: ROUTES.hi,
    label: "Hi",
    icon: "message",
  },
  {
    url: "404",
    label: "404",
    icon: "explosion",
  },
  {
    url: ROUTES.login,
    label: "Login",
    icon: "arrow-right-to-bracket",
  },
  {
    url: ROUTES.register.root,
    label: "Register",
    icon: "user-plus",
  },
  {
    url: ROUTES.onboarding,
    label: "Onboarding",
    icon: "signs-post",
  },
  {
    url: ROUTES.statistics,
    label: "Statistics",
    icon: "chart-column",
  },
  {
    url: ROUTES.contacts.root,
    label: "Contacts",
    icon: "contact-card",
  },
];

function Home() {
  const { colorScheme } = useColorScheme();
  // return <Redirect href={ROUTES.contacts.root} />;
  const iconColor = colorScheme === "dark" ? "#899A96" : "#96A7AF";
  return (
    <ScreenProvider>
      <View className="p-3 flex-wrap flex-row gap-2">
        {routes.map((r) => (
          <Link
            href={r.url as Href}
            key={r.url}
            className="flex-grow rounded-[12px] border-[1px] border-gray-300 dark:border-gray-200 w-[45%]"
          >
            <View className="flex-row gap-x-2 items-center p-4">
              <View className="w-[28px]">
                <FontAwesome6 name={r.icon} size={20} color={iconColor} />
              </View>
              <Text className="text-[16px] font-regular leading-[20px] text-gray-300 dark:text-gray-200">
                {r.label}
              </Text>
            </View>
          </Link>
        ))}
      </View>
    </ScreenProvider>
  );
}

export default Home;
