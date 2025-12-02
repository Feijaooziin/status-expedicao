import { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { getPhone, savePhone } from "../storage";

export default function SettingsScreen() {
  const [numero, setNumero] = useState("");

  useEffect(() => {
    getPhone().then(setNumero);
  }, []);

  const salvar = async () => {
    await savePhone(numero);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Número destino"
        value={numero}
        onChangeText={setNumero}
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
