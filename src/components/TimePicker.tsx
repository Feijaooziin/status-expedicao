import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, Text, View } from "react-native";

interface Props {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
}

export default function TimePicker({ label, value, onChange }: Props) {
  const [show, setShow] = useState(false);

  const handleChange = (_: DateTimePickerEvent, selected?: Date) => {
    setShow(false);
    if (selected) onChange(selected);
  };

  return (
    <View style={{ marginBottom: 15 }}>
      <Text>{label}</Text>

      <Button
        title={
          value
            ? value.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Selecionar horário"
        }
        onPress={() => setShow(true)}
      />

      {show && (
        <DateTimePicker
          mode="time"
          value={value ?? new Date()}
          onChange={handleChange}
        />
      )}
    </View>
  );
}
