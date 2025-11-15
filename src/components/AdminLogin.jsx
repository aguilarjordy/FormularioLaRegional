import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast.error(`❌ Error de Login: ${error.message}`, { position: "top-center" });
    } else {
      toast.success("✅ ¡Bienvenido Administrador!", { position: "top-center" });
      navigate("/admin");
    }

    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // 1. Contenedor principal: Usamos height: 100vh para asegurar que ocupe el 100% exacto de la ventana
    //    y eliminamos la clase min-vh-100 para evitar el scroll.
    <div 
      className="d-flex justify-content-center align-items-center"
      style={{ 
        height: '100vh', 
        background: 'rgba(0, 0, 0, 0.2)' // Overlay semi-transparente para que la tarjeta resalte
      }} 
    >
      <motion.div
        // 2. Tarjeta: Cambiamos p-5 a p-4 (menos padding)
        className="card shadow-lg p-4 bg-white border-0" 
        // 3. Tarjeta: Reducimos maxWidth de 450px a 380px (más compacto)
        style={{ maxWidth: "380px", width: "90%", borderRadius: '1rem' }}
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        
        {/* Encabezado con logo */}
        <div className="text-center mb-4">
          <img 
            src="/logo.png"
            alt="Logo La Regional" 
            className="mb-3 rounded-circle border border-2 border-primary" 
            style={{ width: "80px" }} 
          />
          <h3 className="card-title fw-bold text-dark">
            <i className="bi bi-shield-lock-fill me-2 text-primary"></i> 
            Acceso de Administrador
          </h3>
          <p className="text-muted small">Ingresa tus credenciales de Supabase.</p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Campo de Correo con Icono */}
          <motion.div 
            className="mb-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="email" className="form-label fw-semibold">
              <i className="bi bi-person-fill me-2 text-primary"></i>
              Correo Electrónico
            </label>
            <div className="input-group">
                <span className="input-group-text bg-light"><i className="bi bi-envelope-fill"></i></span>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tuempresa.com"
                  required
                />
            </div>
          </motion.div>

          {/* Campo de Contraseña con OJO */}
          <motion.div 
            className="mb-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="password" className="form-label fw-semibold">
              <i className="bi bi-key-fill me-2 text-primary"></i>
              Contraseña
            </label>
            <div className="input-group">
                <span className="input-group-text bg-light"><i className="bi bi-lock-fill"></i></span>
                <input
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="• • • • • • • •"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <i className={`bi bi-eye${showPassword ? '-slash-fill' : '-fill'}`}></i>
                </button>
            </div>
          </motion.div>
          
          {/* Botón de Login */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="btn btn-primary w-100 fw-bold py-2 shadow" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Verificando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </motion.button>
        </form>
        
        <div className="text-center mt-3">
            <small className="text-muted">Acceso restringido para personal autorizado.</small>
        </div>

      </motion.div>
    </div>
  );
}