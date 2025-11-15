import { Routes, Route, Outlet } from "react-router-dom";
import FormularioRegistro from "./components/FormularioRegistro.jsx";
import RegistroExitoso from "./components/RegistroExitoso.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; 
import { ToastContainer } from "react-toastify"; // Importar ToastContainer

// Componente simple para manejar el 404
function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
      <h1 className="display-1 fw-bold text-peru">404</h1>
      <p className="fs-3">Página No Encontrada</p>
      <p className="text-muted">La URL que intentas acceder no existe.</p>
      <a href="/" className="btn btn-secondary mt-3">Volver al Registro</a>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        
        {/* 1. RUTAS PÚBLICAS (Anidadas bajo un Layout que usa Outlet si fuera necesario) */}
        {/* Aquí la anidamos solo para usar el Outlet de abajo si quisieras un Footer/Header global */}
        <Route path="/" element={<Outlet />}>
          <Route index element={<FormularioRegistro />} />
          <Route path="registro-exitoso" element={<RegistroExitoso />} /> 
        </Route>
        
        {/* 🔑 2. RUTAS DE ADMINISTRADOR (Nivel Superior - Corregido) 🔑 */}
        {/* Estas rutas no heredan nada y están definidas en el nivel raíz */}
        <Route path="/admin-login" element={<AdminLogin />} />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* 3. RUTA 404 (Captura cualquier otra URL) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}