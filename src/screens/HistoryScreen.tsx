import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  clearHistory,
  deleteHistoryItem,
  getHistory,
  HistoryItem,
} from "../storage";

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const loadHistory = () => {
    getHistory().then(setHistory);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = (index: number) => {
    Alert.alert("Excluir item", "Tem certeza que deseja excluir este item?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteHistoryItem(index);
          loadHistory();
        },
      },
    ]);
  };

  const handleClear = () => {
    Alert.alert(
      "Limpar tudo",
      "Tem certeza que deseja excluir todos os itens?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            await clearHistory();
            loadHistory();
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      {history.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>{item.message}</Text>

          <View style={styles.actions}>
            <Button
              title="Copiar"
              onPress={() => Clipboard.setStringAsync(item.message)}
            />

            <Button
              title="Excluir"
              color="red"
              onPress={() => handleDelete(index)}
            />
          </View>
        </View>
      ))}

      <Button title="Limpar tudo" color="red" onPress={handleClear} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
