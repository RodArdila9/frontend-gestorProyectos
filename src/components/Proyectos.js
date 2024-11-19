import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch(
          "http://localhost:8088/gestor/api/proyectos/listar"
        );

        if (response.ok) {
          const data = await response.json();
          setProyectos(data);
        } else {
          setError("Error al cargar proyectos");
        }
      } catch (error) {
        setError("Error de red: no se pudo conectar al servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Cargando proyectos...</p>;
  }

  if (error) {
    return <p className="text-center text-danger mt-5">{error}</p>;
  }

  if (proyectos.length === 0) {
    return (
      <div className="container mt-5 p-5 bg-light rounded shadow text-center">
        <h2 className="mb-4">Lista de proyectos</h2>
        <img
          src="https://img.freepik.com/vector-premium/portapapeles-signo-simbolo-vector-glifo-color-icono_942266-452.jpg?w=250" // Cambia esto por la URL o ruta de tu imagen
          alt="Lista de proyectos"
          className="mt-4 mb-4"
        />
        <h5 className="mb-2">Aún no tienes solicitudes registradas</h5>
        <p className="text-muted mb-4">
          Aquí se mostrarán todas tus solicitudes
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/crear-proyecto")}
        >
          Crear proyecto
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 p-5 bg-light rounded shadow">
      <h2 className="text-center mb-5">Lista de proyectos</h2>
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
        }}
        className="list-group"
      >
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="list-group-item mb-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2">{proyecto.nombre}</h5>
                <p className="mb-2 text-muted">{"Estado: " + proyecto.estado}</p>
              </div>
              <button
                className="btn btn-outline-primary"
                onClick={() => alert(`Detalles de: ${proyecto.nombre}`)}
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-center">
        <button
          className="btn btn-primary"
          style={{ width: "100%", maxWidth: "200px" }}
          onClick={() => navigate("/crear-proyecto")}
        >
          Crear solicitud
        </button>
      </div>
    </div>
  );
}

export default Proyectos;