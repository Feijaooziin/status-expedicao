import Feather from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import { getPhone, saveHistory } from "../storage";
Feather;

export default function HomeScreen() {
  const [data, setData] = useState<Date | null>(null);
  const [carros, setCarros] = useState("");
  const [separacao, setSeparacao] = useState<Date | null>(null);
  const [conferencia, setConferencia] = useState<Date | null>(null);
  const [carregamento, setCarregamento] = useState<Date | null>(null);
  const [pesoBruto, setPesoBruto] = useState("");
  const [volumes, setVolumes] = useState("");
  const [numeroDestino, setNumeroDestino] = useState("");

  useEffect(() => {
    getPhone().then(setNumeroDestino);
  }, []);

  const formatTime = (d: Date | null) =>
    d ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  const formatDate = (d: Date | null) =>
    d ? d.toLocaleDateString("pt-BR") : "";

  function formatNumber(value: string) {
    const numeric = value.replace(/\D/g, "");

    if (!numeric) return "";

    return Number(numeric).toLocaleString("pt-BR");
  }

  const gerarMensagem = () =>
    `*_Status expedição JBS_*
*Data da Operação:* ${formatDate(data)}
*Quantidade de carros:* ${carros}
*Peso Bruto:* ${pesoBruto}
*Volumes:* ${volumes}
*Final da Separação:* ${formatTime(separacao)}
*Final da Conferência:* ${formatTime(conferencia)}
*Final do Carregamento:* ${formatTime(carregamento)}`;

  const enviar = async () => {
    const msg = gerarMensagem();

    await saveHistory(msg);

    const cleanPhone = numeroDestino.replace(/\D/g, "");

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    Linking.openURL(url);
  };

  const copiar = async () => {
    const msg = gerarMensagem();

    Clipboard.setStringAsync(msg);
  };

  const reset = async () => {
    Alert.alert(
      "Limpar capos",
      "Tem certeza que deseja limpar todos os campos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            setData(null);
            setCarros("");
            setSeparacao(null);
            setConferencia(null);
            setCarregamento(null);
            setPesoBruto("");
            setVolumes("");
            setNumeroDestino("");
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <DatePicker label="DATA DA OPERAÇÃO" value={data} onChange={setData} />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="QUANTIDADE DE VEÍCULOS"
        placeholderTextColor={"#000"}
        value={carros}
        onChangeText={setCarros}
      />

      <TextInput
        style={styles.input}
        placeholder="PESO BRUTO"
        keyboardType="numeric"
        placeholderTextColor={"#000"}
        value={pesoBruto}
        onChangeText={(text) => setPesoBruto(formatNumber(text))}
      />

      <TextInput
        style={styles.input2}
        placeholder="VOLUMES"
        keyboardType="numeric"
        placeholderTextColor={"#000"}
        value={volumes}
        onChangeText={(text) => setVolumes(formatNumber(text))}
      />

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

      <TouchableOpacity
        style={[styles.button, { marginTop: 16 }]}
        onPress={copiar}
      >
        <Feather name="copy-outline" size={28} color={"white"} />
        <Text style={styles.buttonText}>COPIAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={enviar}
      >
        <Feather name="logo-whatsapp" size={28} color={"white"} />
        <Text style={styles.buttonText}>ENVIAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginBottom: 64, backgroundColor: "red" }]}
        onPress={reset}
      >
        <Feather name="close" size={28} color={"white"} />
        <Text style={styles.buttonText}>LIMPAR CAMPOS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  button: {
    backgroundColor: "#2c3367",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },

  buttonText: {
    color: "white",
    fontSize: 28,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
    fontSize: 20,
    fontWeight: 600,
    color: "black",
  },

  input2: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 32,
    fontSize: 20,
    fontWeight: 600,
    color: "black",
  },
});
