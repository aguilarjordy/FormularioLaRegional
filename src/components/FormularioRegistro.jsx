import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { ToastContainer, toast } from "react-toastify";

export default function FormularioRegistro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    celular: "",
    correo: "",
    distrito: "",
    producto: "",
    noticiasWhatsapp: false,
    noticiasCorreo: false,
  });

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

    const { error } = await supabase.from("registros").insert([{
      nombre: formData.nombre,
      celular: formData.celular,
      correo: formData.correo,
      distrito: formData.distrito,
      producto: formData.producto,
      noticias_whatsapp: formData.noticiasWhatsapp,
      noticias_correo: formData.noticiasCorreo,
    }]);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("❌ Ocurrió un error. Intenta nuevamente.", { position: "bottom-center" });
    } else {
      toast.success("✅ ¡Registro exitoso! Redirigiendo...", { position: "bottom-center" });
      setTimeout(() => navigate("/registro-exitoso"), 2000);
    }
  };

  return (
    <div className="registro-bg d-flex align-items-center justify-content-center min-vh-100">
      <ToastContainer />
      <div
        className="card shadow-lg border-0 animate__animated animate__fadeInUp"
        style={{ maxWidth: "650px", width: "100%", borderRadius: "20px" }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <img
              src="/logo.png"
              alt="La Regional"
              className="mb-3 rounded-circle border border-3 border-warning"
              style={{ width: "100px" }}
            />
            <h3 className="fw-bold text-danger">La Regional contigo</h3>
            <p className="text-muted small">
              “Queremos que seas parte de nuestra historia. Al compartir tus datos, te acercas a nuestras promociones, eventos y experiencias que celebran lo que somos.”
            </p>
          </div>

          <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn">
            {[
              { name: "nombre", label: "Nombre completo", placeholder: "Tu nombre completo" },
              { name: "celular", label: "Número de celular (WhatsApp)", placeholder: "Ej: 987654321" },
              { name: "correo", label: "Correo electrónico", placeholder: "tucorreo@gmail.com", type: "email" },
              { name: "distrito", label: "Distrito o zona", placeholder: "Ej: Miraflores, Cusco..." },
            ].map((field) => (
              <div className="mb-3" key={field.name}>
                <label className="form-label fw-semibold">{field.label}</label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="form-control form-control-lg shadow-sm"
                  required
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label fw-semibold">
                ¿Qué producto o sabor te conecta con tu historia?
              </label>
              <textarea
                name="producto"
                value={formData.producto}
                onChange={handleChange}
                className="form-control shadow-sm"
                placeholder="Ejemplo: La empanada de ají me recuerda a mi abuela"
                rows="3"
              />
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
                />
                <label className="form-check-label">Sí, por WhatsApp</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="noticiasCorreo"
                  checked={formData.noticiasCorreo}
                  onChange={handleChange}
                />
                <label className="form-check-label">Sí, por correo electrónico</label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-danger w-100 fw-bold py-2 shadow-sm mt-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Enviando...
                </>
              ) : (
                "Enviar registro"
              )}
            </button>
          </form>

          <div className="text-center mt-4 text-muted small animate__animated animate__fadeIn">
            🎁 Al registrarte participas en el sorteo mensual de una caja regional con productos de tu tierra.
          </div>
        </div>
      </div>
    </div>
  );
}
