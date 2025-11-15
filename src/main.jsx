import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import FormularioRegistro from "./components/FormularioRegistro.jsx";
import RegistroExitoso from "./components/RegistroExitoso.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Componente de protección

// Importaciones de estilos
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

// Componente simple para manejar el 404 (página no encontrada)
function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1>404</h1>
      <p>Página no encontrada.</p>
      <a href="/" className="btn btn-secondary">Ir a inicio</a>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Definición de Rutas
        Ahora todas las rutas están definidas aquí, y App.jsx solo envuelve Outlet.
      */}
      <Routes>
        {/*
          Rutas Públicas (Anidadas bajo App para usar Outlet)
          Si App.jsx tiene el layout general (navbars, footers), estos lo heredarán.
        */}
        <Route path="/" element={<App />}>
          <Route index element={<FormularioRegistro />} />
          <Route path="/registro-exitoso" element={<RegistroExitoso />} />

          {/* Rutas de Administrador */}
          <Route path="/admin-login" element={<AdminLogin />} />
          
          <Route
            path="/admin"
            element={
              // Esta ruta estará protegida
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
        
        {/* Ruta para capturar cualquier otra URL (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);