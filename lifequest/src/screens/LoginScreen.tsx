import { useState } from "react";
import { View, TextInput, Alert, Text, StyleSheet, Image } from "react-native";
import { useApp } from "../context/AppContext";
import { Botao } from "../components/Botao";
import { Colors } from "../../constants/theme";

export function LoginScreen() {
  const { login } = useApp();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    try {
      setCarregando(true);
      await login(email, senha);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Tente novamente em alguns instantes.";
      Alert.alert("Não foi possível entrar", message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
        <Image
          source={require("../../assets/images/NewCareLogo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.subtitulo}>Evolua cuidando da sua saúde e bem-estar.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.light.muted}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={Colors.light.muted}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Botao titulo="Entrar" onPress={entrar} carregando={carregando} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: Colors.light.background,
  },
  logo: {
    fontSize: 36,
    fontWeight: "900",
    color: Colors.light.text,
  },
  logoArea: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    width: "100%",
  },
  logoImage: {
    height: 160,
    width: 260,
    maxWidth: "90%",
  },
  subtitulo: {
    color: Colors.light.muted,
    marginTop: 0,
    marginBottom: 36,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.secondary,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "500",
    shadowColor: Colors.light.primary,
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
});
