import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Manejo de errores
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
          setError("Error al cargar proyectos"); // Error del servidor
        }
      } catch (error) {
        setError("Error de red: no se pudo conectar al servidor"); // Error de red
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchProyectos();
  }, []);

  if (loading) {
    return <p>Cargando proyectos...</p>; // Mensaje de carga
  }

  if (error) {
    return <p>{error}</p>; // Mostrar errores
  }

  const handleCrearSolicitud = () => {
    navigate("/crear-proyecto"); // Ruta hacia el formulario de creación
  };

  return (
    <div>
      <h1>Proyectos</h1>
      <button onClick={handleCrearSolicitud} className="btn btn-primary">
        Crear solicitud
      </button>
      {proyectos.length === 0 ? (
        <div>
          <p>Aún no tienes solicitudes registradas</p>
        </div>
      ) : (
        <ul>
          {proyectos.map((proyecto) => (
            <li key={proyecto.id}>
              <h2>{proyecto.nombre}</h2>
              <p>{proyecto.descripcion}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Proyectos;