import * as React from "react";
import { TextInput, View } from "react-native";
import { useColorScheme } from "nativewind";
import { FontAwesome6 } from "@expo/vector-icons";
import { useDebounce } from "use-debounce";
import { useLocalSearchParams, useRouter } from "expo-router";

import { ParamsType } from "@/app/contacts";

function ContactInput() {
  //================================
  // Init
  //================================
  const router = useRouter();
  const { query }: ParamsType = useLocalSearchParams();
  const [term, setTerm] = React.useState(query ?? "");
  const [value] = useDebounce(term, 750);
  const { colorScheme } = useColorScheme();
  const googleColor = colorScheme === "dark" ? "#96A7AF" : "#899A96";

  //================================
  // Handlers
  //================================
  React.useEffect(() => {
    router.setParams({
      query: value,
    });
  }, [router, value]);

  //================================
  // Render
  //================================
  return (
    <View
      className={`w-full h-[60px] rounded-[12px] flex-row flex-nowrap items-center 
    pl-5 pr-2 gap-x-2 bg-light-1 dark:bg-[#1A282F]`}
    >
      <FontAwesome6 name="google" size={16} color={googleColor} />
      <TextInput
        value={term}
        onChangeText={setTerm}
        className={`h-[50px] font-regular text-[14px] text-gray-300 dark:text-gray-200 flex-grow`}
        placeholderTextColor={googleColor}
        placeholder="Search"
        autoCapitalize={"none"}
        autoCorrect={false}
      />
    </View>
  );
}

export default ContactInput;
