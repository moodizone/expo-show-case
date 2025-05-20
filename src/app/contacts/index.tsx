import * as React from "react";
import { View } from "react-native";
import * as Cts from "expo-contacts";
import { MaterialIcons } from "@expo/vector-icons";

import ScreenProvider from "@/components/hoc/ScreenProvider";
import { IconButton } from "@/components/button";
import ContactInput from "@/components/screens/contacts/input";

async function getContacts() {
  const { status } = await Cts.requestPermissionsAsync();

  if (status === Cts.PermissionStatus.GRANTED) {
    const { data } = await Cts.getContactsAsync();

    return data;
  }

  return [];
}

function Contacts() {
  return (
    <ScreenProvider>
      <View className="px-[30px]">
        <View className="flex-row flex-nowrap gap-x-5 items-center">
          <View className="flex-grow">
            <ContactInput />
          </View>
          <View className="flex-grow-0">
            <IconButton
              onPress={() => void 0}
              bgColor={"#3ED598"}
              icon={<MaterialIcons name="sort" size={24} color="white" />}
            />
          </View>
        </View>
      </View>
    </ScreenProvider>
  );
}

export default Contacts;
