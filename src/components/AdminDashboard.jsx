import { useEffect, useState, useMemo } from "react";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// Asumiendo que usas react-icons (si no, usa iconos de Bootstrap o emojis)
// import { FiUsers, FiMessageSquare, FiMail, FiMapPin, FiLogOut } from "react-icons/fi"; 
// Usaremos iconos basados en texto/emojis y clases de Bootstrap para simplificar.

// Contenedores de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

// Item de tarjeta (Card de métricas)
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Componente Tarjeta de Métrica
const MetricCard = ({ icon, title, value, colorClass }) => (
  <motion.div className="col-lg-3 col-md-6 mb-4" variants={itemVariants}>
    <div className={`card shadow border-start-${colorClass} border-4 h-100`}>
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col me-2">
            <div className={`text-xs fw-bold text-${colorClass} text-uppercase mb-1`}>
              {title}
            </div>
            <div className="h5 mb-0 fw-bold text-gray-800">{value}</div>
          </div>
          <div className="col-auto">
            <span className="fs-3 text-gray-300">{icon}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);


export default function AdminDashboard() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegistros();
  }, []);

  // Función para obtener los datos
  const fetchRegistros = async () => {
    const { data, error } = await supabase
      .from("registros")
      .select("*")
      .order('id', { ascending: false });

    if (error) {
      console.error("Error al cargar los registros:", error.message);
      toast.error("❌ No tienes permiso o hubo un error al cargar los datos.", { position: "top-center" });
    } else {
      setRegistros(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("❌ Error al cerrar sesión.", { position: "top-center" });
    } else {
      navigate("/admin-login");
    }
  };

  // 🧠 Lógica interpretativa (Cálculo de métricas)
  const metrics = useMemo(() => {
    const total = registros.length;
    const porWhatsapp = registros.filter(r => r.noticias_whatsapp).length;
    const porCorreo = registros.filter(r => r.noticias_correo).length;
    
    // Obtener los 3 distritos con más registros
    const distritosCount = registros.reduce((acc, r) => {
      acc[r.distrito] = (acc[r.distrito] || 0) + 1;
      return acc;
    }, {});

    const topDistrito = Object.entries(distritosCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 1)[0] || ["N/A", 0];
      

    return { total, porWhatsapp, porCorreo, topDistrito: topDistrito[0] };
  }, [registros]);


  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 text-primary">
      <div className="spinner-border me-2" role="status"></div>
      <strong>Cargando Dashboard...</strong>
    </div>
  );

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      
      {/* HEADER DINÁMICO */}
      <motion.header 
        className="d-flex justify-content-between align-items-center mb-5 p-3 bg-white shadow-sm rounded"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="h3 mb-0 text-gray-800">
          <i className="bi bi-speedometer2 me-2 text-primary"></i> 
          Panel de Administración
        </h1>
        <button 
          onClick={handleLogout} 
          className="btn btn-outline-danger fw-bold"
        >
          <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
        </button>
      </motion.header>
      
      {/* 📊 METRICAS INTERPRETATIVAS */}
      <motion.div 
        className="row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MetricCard 
          icon="👥" 
          title="Total de Registros" 
          value={metrics.total} 
          colorClass="primary" 
        />
        <MetricCard 
          icon="💬" 
          title="Prefieren WhatsApp" 
          value={metrics.porWhatsapp} 
          colorClass="success" 
        />
        <MetricCard 
          icon="📧" 
          title="Prefieren Email" 
          value={metrics.porCorreo} 
          colorClass="warning" 
        />
        <MetricCard 
          icon="📍" 
          title="Distrito Principal" 
          value={metrics.topDistrito} 
          colorClass="info" 
        />
      </motion.div>

      {/* 📋 TABLA DE DATOS */}
      <motion.div 
        className="card shadow mb-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="card-header py-3 bg-primary text-white d-flex justify-content-between align-items-center">
          <h6 className="m-0 fw-bold text-white">
            <i className="bi bi-list-columns-reverse me-2"></i>
            Detalle de Todos los Registros
          </h6>
          <span className="badge bg-light text-primary">{metrics.total} entradas</span>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing="0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Celular</th>
                  <th>Correo</th>
                  <th>Distrito</th>
                  <th>Producto/Historia</th>
                  <th className="text-center">WA</th>
                  <th className="text-center">Email</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((reg, index) => (
                  <motion.tr 
                    key={reg.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }} // Animación de entrada sutil para cada fila
                  >
                    <td>{reg.id}</td>
                    <td>{reg.nombre}</td>
                    <td>{reg.celular}</td>
                    <td>
                      <i className="bi bi-envelope me-1 text-secondary"></i>
                      {reg.correo}
                    </td>
                    <td>
                      <i className="bi bi-geo-alt me-1 text-info"></i>
                      {reg.distrito}
                    </td>
                    <td className="small text-muted fst-italic">{reg.producto}</td>
                    <td className="text-center">
                      <i className={`bi bi-${reg.noticias_whatsapp ? "check-circle-fill text-success" : "x-circle-fill text-danger"}`}></i>
                    </td>
                    <td className="text-center">
                      <i className={`bi bi-${reg.noticias_correo ? "check-circle-fill text-success" : "x-circle-fill text-danger"}`}></i>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}