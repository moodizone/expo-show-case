import * as React from "react";
import * as Cts from "expo-contacts";
import {
  Text,
  FlatList,
  View,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import { ParamsType } from "@/app/contacts";
import { Item } from "@/components/screens/contacts/item";
import { SortEnum } from "@/app/contacts/modal/sort";
import { useAsync } from "@/utils/async";

async function getContacts() {
  const { status } = await Cts.requestPermissionsAsync();

  if (status === Cts.PermissionStatus.GRANTED) {
    const { data } = await Cts.getContactsAsync();
    return data;
  }

  throw new Error("Can not load contacts");
}

function List() {
  const { height } = useWindowDimensions();
  const { query, sort }: ParamsType = useLocalSearchParams();

  const {
    value: contacts = [],
    loading,
    error,
  } = useAsync(async () => {
    const contacts = await getContacts();
    let filtered = contacts;

    if (query) {
      filtered = filtered.filter((c) =>
        c.name?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (sort === SortEnum.firstName) {
      filtered = filtered.sort((a, b) =>
        (a.firstName || "").localeCompare(b.firstName || "")
      );
    }

    if (sort === SortEnum.lastName) {
      filtered = filtered.sort((a, b) =>
        (b.lastName || "").localeCompare(a.lastName || "")
      );
    }
    if (sort === SortEnum.none) {
      filtered = contacts;
    }

    return filtered;
  }, [query, sort]);

  //================================
  // Render
  //================================
  if (loading)
    return (
      <View className="px-[30px] items-center mt-6">
        <ActivityIndicator color={"#3DD598"} size={24} />
      </View>
    );

  if (error)
    return (
      <View className="px-[30px] mt-6">
        <Text className="text-meadow-1000 dark:text-white text-[20px] font-bold leading-[30px] font-regular mb-2">
          {error.name}
        </Text>
        <Text className="text-meadow-1000 dark:text-white text-[14px] leading-[20px] font-regular">
          {error.message}
        </Text>
      </View>
    );

  return (
    <View className="px-[30px] mt-6" style={{ height: height - 200 }}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            phoneNumber={item?.phoneNumbers ? item.phoneNumbers[0] : undefined}
          />
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        getItemLayout={(_, index) => ({
          length: 70,
          offset: 70 * index,
          index,
        })}
        ListEmptyComponent={
          <Text className="text-meadow-1000 dark:text-white text-[14px] leading-[20px] font-regular">
            {"No contacts found"}
          </Text>
        }
      />
    </View>
  );
}

export default List;
