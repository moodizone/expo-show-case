import { getAvatarColor } from "@/utils/color";
import { getInitialsDigit } from "@/utils/strings";
import * as Cts from "expo-contacts";
import { Text, View } from "react-native";

interface Props {
  name: string;
  phoneNumber?: Cts.PhoneNumber;
}

export function Item({ name, phoneNumber }: Props) {
  const digits = getInitialsDigit(name);
  const avatarColor = getAvatarColor(name);
  return (
    <View className="h-[69px] w-full flex-row gap-x-4 flex-nowrap border-b-[1px] border-[#B8C2C023]">
      <View className="flex-grow-0 justify-center">
        <View
          className="w-[60px] h-[60px] rounded-[30px] items-center justify-center"
          style={{ backgroundColor: avatarColor }}
        >
          <Text className="font-bold text-[16px] text-white">{digits}</Text>
        </View>
      </View>
      <View className="flex-grow-1 justify-center">
        <Text
          className="text-meadow-1000 dark:text-white text-[16px] leading-[24px] font-bold"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
        <Text className="text-meadow-1000 dark:text-white text-[14px] leading-[20px] font-regular">
          {phoneNumber?.number ? phoneNumber.number : "-"}
        </Text>
      </View>
    </View>
  );
}
