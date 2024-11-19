import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CrearProyecto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [userId, setUserId] = useState(""); // Captura el userId
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar el ID del usuario logueado desde localStorage
    const loggedUserId = localStorage.getItem("userId");
    if (loggedUserId) {
      setUserId(loggedUserId);
    }

    // Cargar las categorías desde el endpoint
    const fetchCategorias = async () => {
      try {
        const response = await fetch(
          "http://localhost:8088/gestor/api/categorias/listar"
        );
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
        } else {
          console.error("Error al cargar categorías");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const proyecto = {
      nombre,
      descripcion,
      categoria,
      userId,
    };

    try {
      const response = await fetch(
        "http://localhost:8088/gestor/api/proyectos/crear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(proyecto),
        }
      );
      if (response.ok) {
        alert("Proyecto creado con éxito");
        navigate("/proyectos"); // Redirigir a la lista de proyectos
      } else {
        alert("Error al crear el proyecto");
      }
    } catch (error) {
      console.error("Error al crear proyecto:", error);
    }
  };

  return (
    <div className="container mt-5 p-5 bg-light rounded shadow">
      <h2 className="text-center mb-4">Información del nuevo proyecto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="nombre">Título del proyecto</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe el título del proyecto"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="categoria">Categoría</label>
          <select
            className="form-control"
            id="categoria"
            value={categoria}
            style={{ width: "100%", maxWidth: "350px" }}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="userId">ID del usuario</label>
          <input
            type="text"
            className="form-control"
            id="userId"
            style={{ width: "100%", maxWidth: "350px" }}
            value={userId}
            disabled
          />
        </div>
        <div className="form-group mb-5">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="4"
            placeholder="Describe el proyecto"
            required
          ></textarea>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", maxWidth: "200px" }}
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearProyecto;
