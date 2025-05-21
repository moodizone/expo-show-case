import * as React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import ScreenProvider from "@/components/hoc/ScreenProvider";
import { IconButton } from "@/components/button";
import ContactInput from "@/components/screens/contacts/input";
import { ROUTES } from "@/routes";
import List from "@/components/screens/contacts/list";

export interface ParamsType {
  query?: string;
  sort?: string;
}

function Contacts() {
  const { query, sort }: ParamsType = useLocalSearchParams();
  const router = useRouter();
  return (
    <ScreenProvider>
      <View className="px-[30px] flex-row flex-nowrap gap-x-5 items-center mt-6">
        <View className="flex-grow">
          <ContactInput />
        </View>
        <View className="flex-grow-0">
          <IconButton
            onPress={() =>
              router.push({
                pathname: ROUTES.contacts.modal.sort,
                params: { query, sort },
              })
            }
            bgColor={"#3ED598"}
            icon={<MaterialIcons name="sort" size={24} color="white" />}
          />
        </View>
      </View>
      <List />
    </ScreenProvider>
  );
}

export default Contacts;
