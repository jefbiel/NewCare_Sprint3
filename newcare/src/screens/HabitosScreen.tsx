import { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CardMissao } from "../components/CardMissao";
import { useApp } from "../context/AppContext";
import { CategoriaMissao, StatusMissao, TipoMissao } from "../types";
import { Colors } from "../../constants/theme";
import { Botao } from "../components/Botao";
import { BrandHeader } from "../components/BrandHeader";

const categorias = [
  { label: "Mental", valor: CategoriaMissao.Mental },
  { label: "Física", valor: CategoriaMissao.Fisica },
  { label: "Lazer", valor: CategoriaMissao.Lazer },
  { label: "Sono", valor: CategoriaMissao.Sono },
];

export function HabitosScreen() {
  const { colors, missoes, completarMissao, adicionarMissao } = useApp();
  const styles = criarStyles(colors);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState(CategoriaMissao.Mental);
  const [duracao, setDuracao] = useState("5");
  const pendentes = missoes.filter((m) => m.status === StatusMissao.Pendente);
  const missoesConcluidas = missoes.filter((m) => m.status === StatusMissao.Concluida);
  const concluidas = missoes.filter((m) => m.status === StatusMissao.Concluida).length;
  const metadeConcluida = missoes.length > 0 && concluidas >= Math.ceil(missoes.length / 2);

  async function criarMissao() {
    const tituloLimpo = titulo.trim();
    const descricaoLimpa = descricao.trim();
    const duracaoMinutos = Number(duracao);

    if (!tituloLimpo || !descricaoLimpa) {
      Alert.alert("Complete os campos", "Informe título e descrição da nova missão.");
      return;
    }

    if (!Number.isFinite(duracaoMinutos) || duracaoMinutos < 1) {
      Alert.alert("Duração inválida", "Informe uma duração de pelo menos 1 minuto.");
      return;
    }

    await adicionarMissao({
      titulo: tituloLimpo,
      descricao: descricaoLimpa,
      categoria,
      tipo: TipoMissao.Simples,
      recompensaXp: Math.min(50, Math.max(10, duracaoMinutos * 5)),
      recompensaMoedas: Math.min(20, Math.max(3, Math.ceil(duracaoMinutos / 2))),
      duracaoMinutos,
    });

    setTitulo("");
    setDescricao("");
    setCategoria(CategoriaMissao.Mental);
    setDuracao("5");
    Alert.alert("Missão adicionada", "Sua nova missão entrou na lista de pendentes.");
  }

  function concluirMissao(id: string) {
    const missao = missoes.find((item) => item.id === id);
    completarMissao(id);
    if (missao?.status === StatusMissao.Pendente) {
      Alert.alert("Missão concluída", `Você ganhou ${missao.recompensaXp} XP.`);
    }
  }

  function renderAdicionarMissao() {
    return (
      <View style={styles.extraBox}>
        <Text style={styles.extraTitulo}>Adicionar nova missão</Text>
        <Text style={styles.extraTexto}>
          {metadeConcluida
            ? "Você já concluiu metade das missões. Crie um novo desafio para continuar evoluindo."
            : `Complete pelo menos metade das missões para liberar novas tarefas (${concluidas}/${Math.ceil(missoes.length / 2)}).`}
        </Text>

        {metadeConcluida && (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Título da missão"
              placeholderTextColor={colors.muted}
              value={titulo}
              onChangeText={setTitulo}
            />
            <TextInput
              style={[styles.input, styles.inputDescricao]}
              placeholder="Descrição"
              placeholderTextColor={colors.muted}
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Duração em minutos"
              placeholderTextColor={colors.muted}
              value={duracao}
              onChangeText={setDuracao}
              keyboardType="numeric"
            />

            <View style={styles.categorias}>
              {categorias.map((item) => (
                <TouchableOpacity
                  key={item.valor}
                  style={[styles.chip, categoria === item.valor && styles.chipAtivo]}
                  onPress={() => setCategoria(item.valor)}
                >
                  <Text style={[styles.chipTexto, categoria === item.valor && styles.chipTextoAtivo]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Botao titulo="Incluir missão" onPress={criarMissao} />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BrandHeader compact />
      <Text style={styles.titulo}>Missões</Text>
      <Text style={styles.subtitulo}>Acompanhe status, categoria, duração e recompensa.</Text>

      <FlatList
        data={pendentes}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            {renderAdicionarMissao()}
            <Text style={styles.listaTitulo}>Pendentes</Text>
            {pendentes.length === 0 && (
              <Text style={styles.listaVazia}>Nenhuma missão pendente no momento.</Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View>
            <Text style={styles.status}>
              {item.status === StatusMissao.Concluida ? "Concluída" : "Pendente"} • {item.categoria} • {item.duracaoMinutos} min
            </Text>
            <CardMissao missao={item} onPress={concluirMissao} />
          </View>
        )}
        ListFooterComponent={
          <View style={styles.concluidasBox}>
            <Text style={styles.listaTitulo}>Concluídas</Text>
            {missoesConcluidas.length === 0 ? (
              <Text style={styles.listaVazia}>As missões concluídas aparecerão aqui.</Text>
            ) : (
              missoesConcluidas.map((item) => (
                <View key={item.id}>
                  <Text style={styles.status}>
                    Concluída • {item.categoria} • {item.duracaoMinutos} min
                  </Text>
                  <CardMissao missao={item} onPress={concluirMissao} />
                </View>
              ))
            )}
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
  titulo: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.text,
  },
  subtitulo: {
    color: colors.muted,
    marginTop: 4,
    marginBottom: 16,
  },
  status: {
    color: colors.secondary,
    fontWeight: "700",
    marginBottom: 6,
    textTransform: "capitalize",
  },
  extraBox: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 18,
    padding: 16,
    shadowColor: colors.secondary,
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  listaTitulo: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
  },
  listaVazia: {
    color: colors.muted,
    marginBottom: 16,
  },
  concluidasBox: {
    marginTop: 10,
    marginBottom: 28,
  },
  extraTitulo: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  extraTexto: {
    color: colors.muted,
    marginTop: 6,
    marginBottom: 14,
  },
  form: {
    gap: 10,
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.text,
    padding: 13,
  },
  inputDescricao: {
    minHeight: 74,
    textAlignVertical: "top",
  },
  categorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipAtivo: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  chipTexto: {
    color: colors.muted,
    fontWeight: "800",
  },
  chipTextoAtivo: {
    color: colors.primary,
  },
});
