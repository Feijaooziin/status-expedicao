import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

type Props = {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
};

export default function DatePicker({ label, value, onChange }: Props) {
  const [show, setShow] = useState(false);

  const onChangeInternal = (_: any, selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
    setShow(false);
  };

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 18, marginBottom: 6, fontWeight: "500" }}>
        {label}
      </Text>

      <Pressable
        onPress={() => setShow(true)}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 600, color: "black" }}>
          {value ? value.toLocaleDateString("pt-BR") : "Selecionar data"}
        </Text>
      </Pressable>

      {show && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeInternal}
        />
      )}
    </View>
  );
}
