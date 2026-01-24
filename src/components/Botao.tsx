import { Button } from "react-native";

interface BotaoProps {
  color?: string;
  text: string;
  onPress?: () => void;
}

export default function Botao({ color, text, onPress }: BotaoProps) {
  return <Button title={text} color={color} onPress={onPress} />;
}
