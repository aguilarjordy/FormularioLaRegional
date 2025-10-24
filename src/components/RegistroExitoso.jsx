import { motion } from "framer-motion";

export default function RegistroExitoso() {
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
          Gracias por ser parte de <strong>La Regional</strong>.  
          Muy pronto recibirás nuestras novedades y promociones exclusivas.
        </p>
        <motion.a
          href="/"
          className="btn btn-peru fw-bold mt-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Volver al inicio
        </motion.a>
      </motion.div>
    </div>
  );
}
