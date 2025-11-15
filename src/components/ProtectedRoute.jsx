import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';

/**
 * Componente de Ruta Protegida.
 * Verifica si existe una sesión de usuario activa en Supabase.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componente hijo a proteger (AdminDashboard en este caso).
 */
const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener la sesión actual
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error al verificar la sesión:", error);
        toast.error("Error al verificar la sesión de administrador.", { position: "top-center" });
        setSession(null);
      } else {
        setSession(session);
      }
      setLoading(false);
    };

    checkSession();
    
    // Escucha cambios en el estado de autenticación (login, logout, token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    // Limpia el listener al desmontar el componente
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="ms-3">Verificando sesión de administrador...</p>
      </div>
    );
  }

  // Si no hay sesión, redirige al login
  if (!session) {
    // Redirige sin cambiar el historial de navegación
    return <Navigate to="/admin-login" replace />; 
  }

  // Si hay sesión, muestra el contenido protegido (AdminDashboard)
  return children;
};

export default ProtectedRoute;