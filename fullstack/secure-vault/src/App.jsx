import { VaultProvider } from "./context/VaultContext";
import Dashboard from "./Pages/Dashboard";
import "./App.css";

function App() {
  return (
    <VaultProvider>
      <Dashboard />
    </VaultProvider>
  );
}

export default App;