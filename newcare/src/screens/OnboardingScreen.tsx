import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Botao } from "../components/Botao";
import { useApp } from "../context/AppContext";
import { CategoriaMissao } from "../types";
import { Colors } from "../../constants/theme";
import { BrandHeader } from "../components/BrandHeader";

const focos = [
  { label: "Mental", valor: CategoriaMissao.Mental, emoji: "🧠", descricao: "foco, pausa e respiração" },
  { label: "Física", valor: CategoriaMissao.Fisica, emoji: "💪", descricao: "movimento e energia" },
  { label: "Lazer", valor: CategoriaMissao.Lazer, emoji: "🎮", descricao: "descanso e prazer" },
  { label: "Sono", valor: CategoriaMissao.Sono, emoji: "😴", descricao: "rotina e recuperação" },
];

const tempos = [10, 15, 30];
const niveis = ["iniciante", "intermediario", "avancado"] as const;

export function OnboardingScreen() {
  const { concluirOnboarding } = useApp();
  const [foco, setFoco] = useState(CategoriaMissao.Mental);
  const [tempoDiario, setTempoDiario] = useState(15);
  const [nivelAtual, setNivelAtual] = useState<"iniciante" | "intermediario" | "avancado">("iniciante");
  const [carregando, setCarregando] = useState(false);
  const focoSelecionado = focos.find((item) => item.valor === foco) ?? focos[0];

  async function gerarPlano() {
    try {
      setCarregando(true);
      await concluirOnboarding({ foco, tempoDiario, nivelAtual });
    } catch {
      Alert.alert("Não foi possível gerar o plano", "Tente novamente em alguns instantes.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <BrandHeader compact />
        <Text style={styles.titulo}>Monte sua jornada</Text>
        <Text style={styles.subtitulo}>
          Escolha um ponto de partida e o app cria missões diárias proporcionais ao seu tempo.
        </Text>
      </View>

      <View style={styles.cardDestaque}>
        <Text style={styles.cardDestaqueEmoji}>{focoSelecionado.emoji}</Text>
        <View style={styles.cardDestaqueInfo}>
          <Text style={styles.cardDestaqueTitulo}>Plano focado em {focoSelecionado.label}</Text>
          <Text style={styles.cardDestaqueTexto}>
            {tempoDiario} minutos por dia • nível {nivelAtual}
          </Text>
        </View>
      </View>

      <Text style={styles.label}>Área de foco</Text>
      <View style={styles.grid}>
        {focos.map((item) => (
          <TouchableOpacity
            key={item.valor}
            style={[styles.opcao, foco === item.valor && styles.opcaoAtiva]}
            onPress={() => setFoco(item.valor)}
          >
            <Text style={styles.opcaoEmoji}>{item.emoji}</Text>
            <Text style={styles.opcaoTexto}>{item.label}</Text>
            <Text style={styles.opcaoDescricao}>{item.descricao}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Tempo disponível por dia</Text>
      <View style={styles.linha}>
        {tempos.map((tempo) => (
          <TouchableOpacity
            key={tempo}
            style={[styles.chip, tempoDiario === tempo && styles.chipAtivo]}
            onPress={() => setTempoDiario(tempo)}
          >
            <Text style={[styles.chipTexto, tempoDiario === tempo && styles.chipTextoAtivo]}>
              {tempo} min
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Nível atual</Text>
      <View style={styles.linha}>
        {niveis.map((nivel) => (
          <TouchableOpacity
            key={nivel}
            style={[styles.chip, nivelAtual === nivel && styles.chipAtivo]}
            onPress={() => setNivelAtual(nivel)}
          >
            <Text style={[styles.chipTexto, nivelAtual === nivel && styles.chipTextoAtivo]}>
              {nivel}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.resumo}>
        <Text style={styles.resumoTitulo}>Seu plano inicial</Text>
        <View style={styles.resumoLinha}>
          <Text style={styles.resumoLabel}>Missões estimadas</Text>
          <Text style={styles.resumoValor}>{tempoDiario <= 10 ? 2 : tempoDiario <= 20 ? 3 : 4}</Text>
        </View>
        <View style={styles.resumoLinha}>
          <Text style={styles.resumoLabel}>Recompensas</Text>
          <Text style={styles.resumoValor}>XP + moedas</Text>
        </View>
      </View>

      <Botao titulo="Gerar missões" onPress={gerarPlano} carregando={carregando} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 24,
    paddingTop: 54,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 18,
  },
  marca: {
    color: Colors.light.primary,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  titulo: {
    fontSize: 32,
    fontWeight: "900",
    color: Colors.light.text,
  },
  subtitulo: {
    color: Colors.light.muted,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 8,
  },
  cardDestaque: {
    alignItems: "center",
    backgroundColor: Colors.light.text,
    borderRadius: 18,
    flexDirection: "row",
    gap: 14,
    marginBottom: 18,
    padding: 16,
    shadowColor: Colors.light.secondary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 4,
  },
  cardDestaqueEmoji: {
    fontSize: 34,
  },
  cardDestaqueInfo: {
    flex: 1,
  },
  cardDestaqueTitulo: {
    color: Colors.light.surface,
    fontSize: 17,
    fontWeight: "900",
  },
  cardDestaqueTexto: {
    color: Colors.light.primarySoft,
    fontWeight: "700",
    marginTop: 4,
  },
  label: {
    fontWeight: "800",
    color: Colors.light.text,
    marginTop: 18,
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  opcao: {
    width: "48%",
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 16,
    minHeight: 104,
    padding: 14,
    shadowColor: Colors.light.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
  opcaoAtiva: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.primarySoft,
  },
  opcaoEmoji: {
    fontSize: 20,
    marginBottom: 8,
  },
  opcaoTexto: {
    fontWeight: "900",
    color: Colors.light.text,
  },
  opcaoDescricao: {
    color: Colors.light.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },
  linha: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
  },
  chip: {
    backgroundColor: Colors.light.surface,
    borderColor: Colors.light.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipAtivo: {
    backgroundColor: Colors.light.secondarySoft,
    borderColor: Colors.light.secondary,
  },
  chipTexto: {
    color: Colors.light.muted,
    fontWeight: "800",
    textTransform: "capitalize",
  },
  chipTextoAtivo: {
    color: Colors.light.secondary,
  },
  resumo: {
    backgroundColor: Colors.light.surface,
    borderColor: Colors.light.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    marginTop: 10,
    padding: 16,
  },
  resumoTitulo: {
    color: Colors.light.text,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 10,
  },
  resumoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  resumoLabel: {
    color: Colors.light.muted,
    fontWeight: "800",
  },
  resumoValor: {
    color: Colors.light.primary,
    fontWeight: "900",
  },
});
