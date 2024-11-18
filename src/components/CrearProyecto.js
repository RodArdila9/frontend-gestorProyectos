import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearProyecto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [userId, setUserId] = useState(""); // Guardar ID del usuario logueado
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el ID del usuario desde localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    // Obtener categorías desde el endpoint
    const fetchCategorias = async () => {
      try {
        const response = await fetch(
          "http://localhost:8088/gestor/api/categorias/listar"
        );
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleCrearProyecto = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8088/gestor/api/proyectos/crear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            descripcion,
            categoria,
            userId,
            fechaCreacion: new Date().toISOString(),
            fechaModificacion: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        alert("Proyecto creado exitosamente");
        navigate("/proyectos");
      } else {
        alert("Error al crear el proyecto");
      }
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  };

  return (
    <div>
      <h1>Crear Proyecto</h1>
      <form onSubmit={handleCrearProyecto}>
        <div>
          <label>
            Título del proyecto:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Descripción:
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Categoría:
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.nombre} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            ID del Usuario (automático):
            <input type="text" value={userId} readOnly />
          </label>
        </div>
        <button type="submit">Crear Proyecto</button>
      </form>
    </div>
  );
}

export default CrearProyecto;