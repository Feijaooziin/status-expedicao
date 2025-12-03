import { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { getPhone, savePhone } from "../storage";

export default function SettingsScreen() {
  const [numeroDestino, setNumeroDestino] = useState("");
  const [numeroLimpo, setNumeroLimpo] = useState("");

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 2) return `(${digits})`;
    if (digits.length <= 4) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 9)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
      7,
      11
    )}`;
  }

  const onChangePhone = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    setNumeroLimpo(cleaned);
    setNumeroDestino(formatPhone(text));
  };

  useEffect(() => {
    getPhone().then(setNumeroDestino);
  }, []);

  const salvar = async () => {
    await savePhone(numeroLimpo);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Número destino"
        value={numeroDestino}
        onChangeText={onChangePhone}
      />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});
