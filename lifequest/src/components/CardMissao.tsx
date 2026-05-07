import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Missao, StatusMissao } from "../types";
import { Colors } from "../../constants/theme";

interface Props {
  missao: Missao;
  onPress: (id: string) => void;
}

const categoriaEmoji = {
  mental: "🧠",
  fisica: "💪",
  lazer: "🎮",
  sono: "😴",
};

export function CardMissao({ missao, onPress }: Props) {
  const concluida = missao.status === StatusMissao.Concluida;

  return (
    <View style={[styles.card, concluida && styles.cardConcluido]}>
      <View style={styles.header}>
        <Text style={styles.titulo}>
          {categoriaEmoji[missao.categoria]} {missao.titulo}
        </Text>
        <Text style={styles.badge}>{missao.tipo}</Text>
      </View>

      <Text style={styles.descricao}>{missao.descricao}</Text>
      <Text style={styles.meta}>
        🎯 {missao.duracaoMinutos} min • ⭐ +{missao.recompensaXp} XP • 💰 +{missao.recompensaMoedas}
      </Text>

      <TouchableOpacity
        style={[styles.botao, concluida && styles.botaoConcluido]}
        onPress={() => onPress(missao.id)}
        disabled={concluida}
      >
        <Text style={styles.botaoTexto}>{concluida ? "Concluída" : "Completar missão"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: Colors.light.secondary,
    shadowOpacity: 0.07,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  cardConcluido: {
    backgroundColor: Colors.light.successSoft,
    borderColor: "#A9D8F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  titulo: {
    flex: 1,
    fontSize: 16,
    fontWeight: "900",
    color: Colors.light.text,
  },
  badge: {
    backgroundColor: Colors.light.secondarySoft,
    color: Colors.light.secondary,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: "hidden",
    fontSize: 12,
    textTransform: "capitalize",
  },
  descricao: {
    color: Colors.light.muted,
    marginTop: 8,
  },
  meta: {
    color: Colors.light.muted,
    marginTop: 8,
    fontSize: 12,
  },
  botao: {
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  botaoConcluido: {
    backgroundColor: Colors.light.success,
  },
  botaoTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
