import { StatusBar } from "expo-status-bar";
import { AppProvider, useApp } from "./src/context/AppContext";
import { AppNavigator } from "./src/routes/AppNavigator";

function AppContent() {
  const { temaResolvido } = useApp();

  return (
    <>
      <StatusBar style={temaResolvido === "dark" ? "light" : "dark"} />
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
