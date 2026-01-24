import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Botao from "../components/Botao";
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
      11,
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
    if (numeroLimpo.length < 11) {
      Alert.alert("Erro", "Número inválido. Insira um número válido.");
      return;
    }
    Alert.alert("Sucesso", "Número " + numeroDestino + " salvo com sucesso!");
    await savePhone(numeroLimpo);
  };

  const handleClear = () => {
    Alert.alert("Limpar campo", "Tem certeza que deseja limpar o campo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Limpar",
        style: "destructive",
        onPress: async () => {
          setNumeroDestino("");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text>Digite o Número para enviar as mensagens:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Número destino"
        value={numeroDestino}
        onChangeText={onChangePhone}
        maxLength={15}
      />

      <Botao text="Salvar" onPress={salvar} />
      <Botao text="Limpar Campos" color={"#FF0000"} onPress={handleClear} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    padding: 24,
    gap: 24,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
});
