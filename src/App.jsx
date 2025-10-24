import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormularioRegistro from "./components/FormularioRegistro";
import RegistroExitoso from "./components/RegistroExitoso";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormularioRegistro />} />
        <Route path="/registro-exitoso" element={<RegistroExitoso />} />
      </Routes>
    </Router>
  );
}

export default App;
