import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Colors } from "../../constants/theme";

interface Props {
  titulo: string;
  onPress: () => void;
  carregando?: boolean;
  variante?: "primario" | "secundario";
}

export function Botao({ titulo, onPress, carregando = false, variante = "primario" }: Props) {
  return (
    <TouchableOpacity
      style={[styles.btn, variante === "secundario" && styles.secundario]}
      onPress={onPress}
      disabled={carregando}
    >
      {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{titulo}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    minHeight: 50,
    justifyContent: "center",
    shadowColor: Colors.light.primary,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  secundario: {
    backgroundColor: Colors.light.secondary,
    shadowColor: Colors.light.secondary,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
  },
});
