import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { getHistory, HistoryItem } from "../storage";

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {history.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>{item.message}</Text>
          <Button
            title="Copiar"
            onPress={() => Clipboard.setStringAsync(item.message)}
          />
        </View>
      ))}
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
});
