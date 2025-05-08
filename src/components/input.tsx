import * as React from "react";
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  error?: string;
  secureToggle?: boolean;
  eyeColor?: string;
}

export default function Input({
  error,
  secureToggle,
  eyeColor,
  className,
  ...props
}: InputProps) {
  const [secure, setSecure] = React.useState(props.secureTextEntry);

  return (
    <View className={className}>
      <View className="relative">
        <TextInput
          {...props}
          secureTextEntry={secure}
          placeholderTextColor="#999"
          className={`h-[50px] font-regular text-[18px] text-gray-300 border-b-[2px] border-[#BEC7C570] focus:border-[#BEC7C5f0]
            ${secureToggle ? "pr-8" : ""}`}
        />

        {secureToggle && (
          <TouchableOpacity
            className="absolute top-[15px] right-0"
            onPress={() => setSecure((prev) => !prev)}
          >
            <Ionicons
              name={secure ? "eye-off" : "eye"}
              size={20}
              color={eyeColor ?? "#999"}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-[12px] text-red-500">{error}</Text>}
    </View>
  );
}
