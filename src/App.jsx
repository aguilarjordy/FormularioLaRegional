import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="app-root">
      {/* Outlet renderiza el componente de la ruta anidada actual (Formulario, Dashboard, Login) */}
      <Outlet />
    </div>
  );
}