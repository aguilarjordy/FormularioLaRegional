export default function RegistroExitoso() {
  return (
    <div className="bg-warning-subtle min-vh-100 d-flex align-items-center justify-content-center text-center p-4">
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "500px" }}>
        <img src="/logo.png" alt="La Regional" style={{ width: "90px" }} className="mx-auto mb-3" />
        <h3 className="fw-bold text-warning-emphasis">¡Registro exitoso! 🎉</h3>
        <p className="text-muted">
          Gracias por ser parte de <strong>La Regional</strong>.
          Muy pronto recibirás nuestras novedades y promociones exclusivas.
        </p>
        <a href="/" className="btn btn-warning fw-bold mt-3">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
