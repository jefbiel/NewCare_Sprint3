import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { LoginScreen } from "../screens/LoginScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { HabitosScreen } from "../screens/HabitosScreen";
import { ProgressoScreen } from "../screens/ProgressoScreen";
import { PerfilScreen } from "../screens/PerfilScreen";
import { useApp } from "../context/AppContext";
import { Colors } from "../../constants/theme";
import { MainTabParamList, RootStackParamList } from "./types";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors.light.surface,
          borderTopColor: Colors.light.border,
          height: 62,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: "home",
            Habitos: "checkbox",
            Progresso: "stats-chart",
            Perfil: "person",
          };

          return <Ionicons name={icons[route.name]} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
      <Tab.Screen name="Habitos" component={HabitosScreen} options={{ title: "Missões" }} />
      <Tab.Screen name="Progresso" component={ProgressoScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { carregandoInicial, usuario } = useApp();

  if (carregandoInicial) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={Colors.light.primary} size="large" />
        <Text style={styles.loadingText}>Preparando sua jornada...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!usuario ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : !usuario.onboardingCompleto ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <Stack.Screen name="Main" component={Tabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    backgroundColor: Colors.light.background,
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  loadingText: {
    color: Colors.light.muted,
    fontWeight: "800",
    marginTop: 12,
  },
});
