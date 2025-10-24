export default function RegistroExitoso() {
  return (
    <div className="registro-fondo min-vh-100 d-flex align-items-center justify-content-center text-center p-4">
      <div className="card shadow-lg border-0 p-4 form-card" style={{ maxWidth: "500px" }}>
        <div className="logo-ring d-inline-block mb-3">
          <img
            src="/logo.png"
            alt="La Regional"
            className="rounded-circle"
            style={{ width: "90px", height: "90px", objectFit: "cover" }}
          />
        </div>
        <h3 className="fw-bold text-primary-peru">¡Registro exitoso! 🎉</h3>
        <p className="text-muted">
          Gracias por ser parte de <strong>La Regional</strong>.
          Muy pronto recibirás nuestras novedades y promociones exclusivas.
        </p>
        <a href="/" className="btn btn-primary-peru fw-bold mt-3">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
