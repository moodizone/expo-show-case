import * as React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

import ModalOverlay from "@/components/screens/auth/modalOverlay";
import { ROUTES } from "@/routes";

export enum SortEnum {
  firstName = "1",
  lastName = "2",
  none = "3",
}

const options = [
  { id: SortEnum.firstName, label: "Sort by first name" },
  { id: SortEnum.lastName, label: "Sort by last name" },
  { id: SortEnum.none, label: "None" },
];

function SortModal() {
  const { query, sort } = useLocalSearchParams<{
    query?: string;
    sort?: string;
  }>();
  const router = useRouter();
  return (
    <ModalOverlay
      position="bottom"
      onBackdrop={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.dismissTo(ROUTES.contacts.root);
        }
      }}
    >
      <View className="bg-white dark:bg-gray-700 rounded-tl-[24px] rounded-tr-[24px] px-8 py-6 w-full">
        {options.map((option, index) => {
          let isActivated = false;

          if (sort) {
            isActivated = sort === option.id;
          }
          // activate 'none' whenever there is no sort parameter
          else {
            isActivated = option.id === SortEnum.none;
          }

          const activeClass = isActivated
            ? "font-bold text-meadow-250"
            : "text-meadow-1000 dark:text-white font-regular";
          const borderStyle =
            index === 2 ? "" : "border-b-[1px] border-[#B8C2C059]";

          return (
            <Pressable
              key={option.id}
              className={twMerge(
                "h-[60px] items-start justify-center",
                borderStyle
              )}
              onPress={() => {
                router.replace({
                  pathname: ROUTES.contacts.root,
                  params: { query, sort: option.id === SortEnum.none ? "" : option.id },
                });
              }}
            >
              <Text
                className={twMerge(
                  "text-[18px] leading-[26px] text-meadow-250",
                  activeClass
                )}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ModalOverlay>
  );
}

export default SortModal;
