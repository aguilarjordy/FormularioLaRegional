import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import FormularioRegistro from "./components/FormularioRegistro.jsx";
import RegistroExitoso from "./components/RegistroExitoso.jsx";
// 🔑 Importaciones de administrador (asegúrate de que estas rutas sean correctas)
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; 

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
      <Routes>
        
        {/* 1. RUTAS PÚBLICAS ANIDADAS (Usan el layout de App) */}
        <Route path="/" element={<App />}>
          {/* La ruta base / */}
          <Route index element={<FormularioRegistro />} />
          <Route path="registro-exitoso" element={<RegistroExitoso />} /> 
          {/* Nota: Usamos path relativo (sin /) para registro-exitoso */}
        </Route>
        
        {/* 🔑 2. RUTAS DE ADMINISTRADOR (NIVEL SUPERIOR - CORREGIDO) 🔑 */}
        {/* Estas rutas ahora se encuentran directamente en el nivel raíz */}
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
        
        {/* 3. RUTA 404 (Captura todo lo demás) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);