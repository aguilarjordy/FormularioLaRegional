import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function FormularioRegistro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    celular: "",
    correo: "",
    distrito: "",
    producto: "",
    noticiasWhatsapp: false,
    noticiasCorreo: false,
  });

  const [loading, setLoading] = useState(false);

  // Lista de distritos de Lima Metropolitana
  const distritos = [
    "Ancón", "Ate", "Barranco", "Breña", "Carabayllo", "Cercado de Lima", "Chaclacayo",
    "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independencia", "Jesús María",
    "La Molina", "La Victoria", "Lince", "Los Olivos", "Lurigancho-Chosica", "Lurín",
    "Magdalena del Mar", "Miraflores", "Pachacámac", "Pucusana", "Pueblo Libre", "Puente Piedra",
    "Punta Hermosa", "Punta Negra", "Rímac", "San Bartolo", "San Borja", "San Isidro",
    "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis", "San Martín de Porres",
    "San Miguel", "Santa Anita", "Santa María del Mar", "Santa Rosa", "Santiago de Surco",
    "Surquillo", "Villa El Salvador", "Villa María del Triunfo"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("registros").insert([
      {
        nombre: formData.nombre,
        celular: formData.celular,
        correo: formData.correo,
        distrito: formData.distrito,
        producto: formData.producto,
        noticias_whatsapp: formData.noticiasWhatsapp,
        noticias_correo: formData.noticiasCorreo,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("❌ Hubo un problema al enviar tus datos. Intenta nuevamente.", {
        position: "bottom-center",
      });
    } else {
      toast.success("✅ ¡Gracias por registrarte! Redirigiendo...", {
        position: "bottom-center",
      });

      setTimeout(() => {
        navigate("/registro-exitoso");
      }, 2000);

      setFormData({
        nombre: "",
        celular: "",
        correo: "",
        distrito: "",
        producto: "",
        noticiasWhatsapp: false,
        noticiasCorreo: false,
      });
    }
  };

  return (
    <div className="bg-peru-pattern min-vh-100 d-flex align-items-center justify-content-center p-4">
      <ToastContainer />
      <motion.div
        className="card shadow-lg border-0 form-card"
        style={{ maxWidth: "600px", width: "100%" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="card-body">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src="/logo.png"
              alt="La Regional"
              className="mb-3 rounded-circle border border-3 border-peru"
              style={{ width: "90px" }}
            />
            <h3 className="fw-bold text-peru">La Regional contigo</h3>
            <p className="text-muted small">
              Queremos que seas parte de nuestra historia. Coméntanos y
              conéctate con los sabores y tradiciones que nos unen.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            {/* Nombre */}
            <motion.div
              className="mb-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="form-label fw-semibold">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Tu nombre completo"
              />
            </motion.div>

            {/* Celular */}
            <motion.div
              className="mb-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="form-label fw-semibold">Número de celular (WhatsApp)</label>
              <input
                type="text"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Ej: 987654321"
              />
            </motion.div>

            {/* Correo */}
            <motion.div
              className="mb-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="form-label fw-semibold">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="tucorreo@gmail.com"
              />
            </motion.div>

            {/* Distrito */}
            <motion.div
              className="mb-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="form-label fw-semibold">Distrito o zona</label>
              <select
                name="distrito"
                value={formData.distrito}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Selecciona tu distrito</option>
                {distritos.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Producto */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Cuéntanos, ¿Qué producto o sabor te conecta con tu historia?
              </label>
              <textarea
                name="producto"
                value={formData.producto}
                onChange={handleChange}
                className="form-control"
                placeholder="Ejemplo: La empanada de ají me recuerda a mi abuela"
                rows="3"
              ></textarea>
            </div>

            {/* Noticias */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                ¿Te gustaría recibir noticias de La Regional?
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="noticiasWhatsapp"
                  checked={formData.noticiasWhatsapp}
                  onChange={handleChange}
                  id="whatsappCheck"
                />
                <label className="form-check-label" htmlFor="whatsappCheck">
                  Sí, por WhatsApp
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="noticiasCorreo"
                  checked={formData.noticiasCorreo}
                  onChange={handleChange}
                  id="correoCheck"
                />
                <label className="form-check-label" htmlFor="correoCheck">
                  Sí, por correo electrónico
                </label>
              </div>
            </div>

            {/* Botón */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn btn-peru w-100 fw-bold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Enviando...
                </>
              ) : (
                "Enviar registro"
              )}
            </motion.button>
          </form>

          <motion.div
            className="text-center mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-muted small">
              🎁 Al registrarte participas en el sorteo mensual de una caja regional
              con productos de tu tierra.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
