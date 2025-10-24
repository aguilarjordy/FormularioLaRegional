import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { ToastContainer, toast } from "react-toastify";
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
    <div className="registro-fondo d-flex align-items-center justify-content-center min-vh-100 p-4">
      <ToastContainer />
      <div className="card shadow-lg border-0 p-4 form-card" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="text-center mb-4">
          <div className="logo-ring d-inline-block mb-3">
            <img
              src="/logo.png"
              alt="La Regional"
              className="rounded-circle"
              style={{ width: "90px", height: "90px", objectFit: "cover" }}
            />
          </div>
          <h3 className="fw-bold text-primary-peru">La Regional contigo</h3>
          <p className="text-muted small">
            Queremos que seas parte de nuestra historia. Al compartir tus datos,
            te acercas a nuestras promociones, eventos y experiencias que celebran lo que somos.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nombre completo</label>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Número de celular (WhatsApp)</label>
            <input
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Ej: 987654321"
            />
          </div>

          <div className="mb-3">
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
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Distrito o zona</label>
            <input
              name="distrito"
              value={formData.distrito}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Ej: Miraflores, Cusco..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              ¿Qué producto o sabor te conecta con tu historia?
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

          <button
            type="submit"
            className="btn btn-primary-peru w-100 fw-bold mt-2"
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
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted small">
            🎁 Al registrarte participas en el sorteo mensual de una caja regional con productos de tu tierra.
          </p>
        </div>
      </div>
    </div>
  );
}
