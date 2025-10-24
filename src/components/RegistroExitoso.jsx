export default function RegistroExitoso() {
  return (
    <div className="registro-bg d-flex align-items-center justify-content-center min-vh-100 text-center p-4">
      <div
        className="card p-5 shadow-lg border-0 animate__animated animate__fadeInUp"
        style={{ maxWidth: "500px", borderRadius: "20px" }}
      >
        <img
          src="/logo.png"
          alt="La Regional"
          className="mx-auto mb-3 rounded-circle border border-3 border-warning"
          style={{ width: "100px" }}
        />
        <h3 className="fw-bold text-danger animate__animated animate__pulse animate__infinite">
          ¡Registro exitoso! 🎉
        </h3>
        <p className="text-muted">
          Gracias por ser parte de <strong>La Regional</strong>.<br />
          Muy pronto recibirás nuestras novedades y promociones exclusivas.
        </p>
        <a href="/" className="btn btn-danger fw-bold mt-3 shadow-sm">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
