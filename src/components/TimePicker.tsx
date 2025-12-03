import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      <Text
        style={{
          fontSize: 18,
          fontWeight: 700,
          textTransform: "uppercase",
          color: "black",
          marginBottom: 6,
        }}
      >
        {label}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => setShow(true)}>
        <Text style={styles.buttonText}>
          {value
            ? value.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Selecionar horário"}
        </Text>
      </TouchableOpacity>

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

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2c3367",
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: 700,
    textTransform: "uppercase",
  },
});
