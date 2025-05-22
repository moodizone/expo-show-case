import * as React from "react";
import * as Cts from "expo-contacts";
import { Text, FlatList, View, useWindowDimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { ParamsType } from "@/app/contacts";
import { Item } from "@/components/screens/contacts/item";
import { SortEnum } from "@/app/contacts/modal/sort";
import { useAsync } from "@/utils/async";
import { throwPermissionError } from "@/utils/error";
import { ErrorAlert } from "@/components/error";
import { LoadingAlert } from "@/components/loading";

async function getContacts() {
  const permission = await Cts.getPermissionsAsync();

  if (permission.granted) {
    const { data } = await Cts.getContactsAsync();
    return data;
  } else if (!permission.granted && permission.canAskAgain) {
    const { status } = await Cts.requestPermissionsAsync();
    if (status === Cts.PermissionStatus.GRANTED) {
      const { data } = await Cts.getContactsAsync();
      return data;
    }
  }

  throwPermissionError(
    "Contacts permissions are not granted. Please enable them in your device settings."
  );
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
  if (loading) return <LoadingAlert className="px-[30px] mt-6" />;
  if (error) return <ErrorAlert className="px-[30px] mt-6" error={error} />;

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
