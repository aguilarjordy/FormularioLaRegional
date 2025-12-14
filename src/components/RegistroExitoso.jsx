import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa"; // 💡 Íconos de redes sociales

// 🔑 URLS de tus redes sociales (¡REEMPLAZA ESTO!)
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/laregionalmarket?locale=es_LA",
  instagram: "https://www.instagram.com/laregionalmarket/",
  tiktok: "https://www.tiktok.com/@laregionalmarket",
  whatsapp: "https://wa.me/51958700568",
};

// 🔑 Estilo para los íconos
const socialIconStyle = {
  fontSize: "2.5rem",
  color: "#495057", // Color gris oscuro
  transition: "color 0.3s",
};

export default function RegistroExitoso() {
  const location = useLocation();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const nombreFromState = location.state?.nombre;
    const nombreFromStorage = localStorage.getItem("nombreRegistro");

    if (nombreFromState) {
      setNombre(nombreFromState);
      localStorage.setItem("nombreRegistro", nombreFromState);
    } else if (nombreFromStorage) {
      setNombre(nombreFromStorage);
    } else {
      setNombre("amigo");
    }
  }, [location.state]);

  const handleVolver = () => {
    localStorage.removeItem("nombreRegistro");
    navigate("/");
  };

  return (
    <div className="bg-peru-pattern min-vh-100 d-flex align-items-center justify-content-center text-center p-4">
      <motion.div
        className="card shadow-lg border-0 p-4 text-center"
        style={{ maxWidth: "500px" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.img
          src="/logo.png"
          alt="La Regional"
          style={{ width: "90px" }}
          className="mx-auto mb-3 rounded-circle border border-3 border-peru"
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <h3 className="fw-bold text-peru">¡Registro exitoso! 🎉</h3>
        <p className="text-muted">
          Gracias <strong>{nombre}</strong> por ser parte de <strong>La Regional</strong>.<br />
          Síguenos en nuestras redes para no perderte nada.
        </p>
        
        {/* 🚀 Íconos de Redes Sociales */}
        <div className="d-flex justify-content-center gap-4 my-3">
          <motion.a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#4267B2" }}
            style={socialIconStyle}
          >
            <FaFacebook />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#E1306C" }}
            style={socialIconStyle}
          >
            <FaInstagram />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#000000" }}
            style={socialIconStyle}
          >
            <FaTiktok />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#25D366" }}
            style={socialIconStyle}
          >
            <FaWhatsapp />
          </motion.a>
        </div>
        {/* Fin del bloque de íconos */}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleVolver}
          className="btn btn-peru fw-bold mt-3"
        >
          Volver al inicio
        </motion.button>
      </motion.div>
    </div>
  );
}