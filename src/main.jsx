import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Solo importamos BrowserRouter
import App from "./App.jsx";
// ... (Tus importaciones de estilos) ...

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* App.jsx ahora contiene el componente Routes y todas las rutas */}
      <App /> 
    </BrowserRouter>
  </React.StrictMode>
);