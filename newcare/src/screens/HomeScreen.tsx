import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useApp } from "../context/AppContext";
import { CardMissao } from "../components/CardMissao";
import { StatusMissao } from "../types";
import { Colors } from "../../constants/theme";
import { BrandHeader } from "../components/BrandHeader";

function progressoNivel(xp: number) {
  const faixas = [0, 100, 250, 500, 900, 1400];
  const atual = [...faixas].reverse().find((valor) => xp >= valor) ?? 0;
  const proxima = faixas.find((valor) => valor > xp) ?? xp + 500;
  return {
    percentual: Math.min(((xp - atual) / (proxima - atual)) * 100, 100),
    proxima,
  };
}

export function HomeScreen() {
  const { colors, usuario, missoes, completarMissao } = useApp();
  const styles = criarStyles(colors);
  const concluidas = missoes.filter((m) => m.status === StatusMissao.Concluida).length;
  const pendentes = missoes.filter((m) => m.status === StatusMissao.Pendente);
  const percentualHoje = Math.round((concluidas / Math.max(1, missoes.length)) * 100);
  const xp = progressoNivel(usuario?.xp ?? 0);

  function concluirMissao(id: string) {
    const missao = missoes.find((item) => item.id === id);
    completarMissao(id);
    if (missao?.status === StatusMissao.Pendente) {
      Alert.alert("Missão concluída", `Você ganhou ${missao.recompensaXp} XP.`);
    }
  }

  return (
    <View style={styles.container}>
      <BrandHeader compact />
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.saudacao}>Olá, {usuario?.nome}</Text>
          <Text style={styles.subtitulo}>
            Level {usuario?.nivel} • Especialidade: {usuario?.areaDominante}
          </Text>
        </View>
      </View>

      <View style={styles.painel}>
        <View style={styles.painelTopo}>
          <View>
            <Text style={styles.painelLabel}>Evolução atual</Text>
            <Text style={styles.painelTitulo}>Nível {usuario?.nivel}</Text>
          </View>
          <View style={styles.xpPill}>
            <Text style={styles.xpPillTexto}>⭐ {usuario?.xp} XP</Text>
          </View>
        </View>
        <View style={styles.barra}>
          <View style={[styles.barraInterna, { width: `${xp.percentual}%` }]} />
        </View>
        <Text style={styles.meta}>Próximo nível em {xp.proxima} XP</Text>
      </View>

      <View style={styles.resumoGrid}>
        <View style={styles.resumoCard}>
          <Text style={styles.resumoValor}>{percentualHoje}%</Text>
          <Text style={styles.resumoLabel}>Hoje</Text>
        </View>
        <View style={styles.resumoCard}>
          <Text style={styles.resumoValor}>🔥 {usuario?.streak}</Text>
          <Text style={styles.resumoLabel}>Streak</Text>
        </View>
        <View style={styles.resumoCard}>
          <Text style={styles.resumoValor}>{pendentes.length}</Text>
          <Text style={styles.resumoLabel}>Pendentes</Text>
        </View>
      </View>

      <View style={styles.linhaTitulo}>
        <View>
          <Text style={styles.tituloSecao}>Próximas missões</Text>
          <Text style={styles.descricaoSecao}>Complete tarefas para ganhar XP e moedas.</Text>
        </View>
        <Text style={styles.contador}>{concluidas}/{missoes.length}</Text>
      </View>

      <FlatList
        data={pendentes.length > 0 ? pendentes : missoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardMissao missao={item} onPress={concluirMissao} />
        )}
        ListEmptyComponent={
          <View style={styles.estadoVazio}>
            <Text style={styles.estadoVazioTitulo}>Tudo pronto por hoje</Text>
            <Text style={styles.estadoVazioTexto}>Você concluiu todas as missões disponíveis.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const criarStyles = (colors: typeof Colors.light) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: 56,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
  },
  headerInfo: {
    flex: 1,
  },
  marca: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  saudacao: {
    fontSize: 25,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 2,
  },
  subtitulo: {
    color: colors.muted,
    marginTop: 4,
    marginBottom: 12,
  },
  painel: {
    backgroundColor: colors.text,
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
    marginBottom: 14,
    shadowColor: colors.secondary,
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  painelTopo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  painelLabel: {
    color: colors.primarySoft,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  painelTitulo: {
    color: colors.surface,
    fontWeight: "900",
    fontSize: 24,
    marginTop: 2,
  },
  xpPill: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  xpPillTexto: {
    color: colors.surface,
    fontWeight: "900",
  },
  barra: {
    height: 9,
    borderRadius: 999,
    backgroundColor: "#174A6B",
    marginTop: 16,
    overflow: "hidden",
  },
  barraInterna: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  meta: {
    color: colors.primarySoft,
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
  },
  resumoGrid: {
    flexDirection: "row",
    gap: 10,
  },
  resumoCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    padding: 12,
  },
  resumoValor: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  resumoLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
  },
  linhaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 12,
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
  },
  descricaoSecao: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  contador: {
    color: colors.primary,
    fontWeight: "900",
    fontSize: 16,
  },
  estadoVazio: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  estadoVazioTitulo: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900",
  },
  estadoVazioTexto: {
    color: colors.muted,
    marginTop: 4,
  },
});
