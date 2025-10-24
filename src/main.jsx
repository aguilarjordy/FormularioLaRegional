import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import FormularioRegistro from "./components/FormularioRegistro.jsx";
import RegistroExitoso from "./components/RegistroExitoso.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<FormularioRegistro />} />
          <Route path="/registro-exitoso" element={<RegistroExitoso />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
