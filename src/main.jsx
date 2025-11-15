import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Solo BrowserRouter
import App from "./App.jsx";

// 🔑 IMPORTACIONES DE ESTILOS AQUÍ 🔑
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css"; // Tu CSS personalizado

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* App.jsx ahora contiene el componente Routes y todas las rutas */}
      <App /> 
    </BrowserRouter>
  </React.StrictMode>
);