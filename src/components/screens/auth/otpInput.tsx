import Input from "@/components/input";
import * as React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

interface Props {
  onCodeFilled(code: string): void;
}

export default function OTPInput({ onCodeFilled }: Props) {
  //================================
  // Init
  //================================
  const inputs = React.useRef<TextInput[]>([]);
  const [values, setValues] = React.useState(["", "", "", ""]);

  //================================
  // Handlers
  //================================
  function handleChange(text: string, index: number) {
    // accept only 0-9 or empty
    if (!/^\d?$/.test(text)) return;

    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    if (newValues.every((v) => v !== "")) {
      onCodeFilled(newValues.join(""));
    }
  }

  function handleKeyPress(
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) {
    if (
      e.nativeEvent.key === "Backspace" &&
      values[index] === "" &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  }

  //================================
  // Render
  //================================
  return (
    <View className="flex-row gap-x-1 justify-between">
      {values.map((digit, index) => (
        <View
          className="flex items-center  border-b-[2px] border-[#0000000D] dark:border-gray-400"
          key={index}
        >
          <TextInput
            ref={(ref) => {
              inputs.current[index] = ref as TextInput;
            }}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            className="text-[24px] font-bold leading-[24px] text-meadow-1000 dark:text-white w-[60px] text-center"
          />
        </View>
      ))}
    </View>
  );
}
