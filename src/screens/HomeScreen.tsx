import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import TimePicker from "../components/TimePicker";
import { getPhone, saveHistory } from "../storage";

export default function HomeScreen() {
  const [separacao, setSeparacao] = useState<Date | null>(null);
  const [conferencia, setConferencia] = useState<Date | null>(null);
  const [carregamento, setCarregamento] = useState<Date | null>(null);
  const [pesoBruto, setPesoBruto] = useState("");
  const [volumes, setVolumes] = useState("");
  const [numeroDestino, setNumeroDestino] = useState("");

  useEffect(() => {
    getPhone().then(setNumeroDestino);
  }, []);

  const format = (d: Date | null) =>
    d ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  const gerarMensagem = () => `
Status expedição JBS
Final da separação: ${format(separacao)}
Final da Conferência: ${format(conferencia)}
Final do Carregamento: ${format(carregamento)}
Peso Bruto: ${pesoBruto}
Volumes: ${volumes}
`;

  const enviar = async () => {
    const msg = gerarMensagem();

    await saveHistory(msg);

    const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(
      msg
    )}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <TimePicker
        label="Final da Separação"
        value={separacao}
        onChange={setSeparacao}
      />
      <TimePicker
        label="Final da Conferência"
        value={conferencia}
        onChange={setConferencia}
      />
      <TimePicker
        label="Final do Carregamento"
        value={carregamento}
        onChange={setCarregamento}
      />

      <TextInput
        style={styles.input}
        placeholder="Peso bruto"
        value={pesoBruto}
        onChangeText={setPesoBruto}
      />

      <TextInput
        style={styles.input}
        placeholder="Volumes"
        value={volumes}
        onChangeText={setVolumes}
      />

      <TouchableOpacity style={styles.button} onPress={enviar}>
        ENVIAR
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
  },

  button: {
    backgroundColor: "#2c3367",
    padding: 16,
    alignItems: "center",
    color: "white",
    fontSize: 28,
    fontWeight: 700,
    borderRadius: 8,
    textTransform: "uppercase",
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 600,
    color: "black",
  },
});
