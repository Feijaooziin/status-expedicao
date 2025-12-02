import AsyncStorage from "@react-native-async-storage/async-storage";

export interface HistoryItem {
  message: string;
  date: string;
}

const KEY_HISTORY = "history";
const KEY_PHONE = "phone";

export const saveHistory = async (message: string) => {
  const old = (await getHistory()) || [];
  const novo: HistoryItem = { message, date: new Date().toISOString() };

  await AsyncStorage.setItem(KEY_HISTORY, JSON.stringify([novo, ...old]));
};

export const getHistory = async (): Promise<HistoryItem[]> => {
  const data = await AsyncStorage.getItem(KEY_HISTORY);
  return data ? JSON.parse(data) : [];
};

export const savePhone = async (phone: string) => {
  await AsyncStorage.setItem(KEY_PHONE, phone);
};

export const getPhone = async () => {
  return (await AsyncStorage.getItem(KEY_PHONE)) || "559999999999";
};
