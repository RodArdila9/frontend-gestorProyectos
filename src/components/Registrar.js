import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registrar() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    edad: "",
    estrato: "",
    ciudad: "",
    user: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8088/gestor/api/usuario/crear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Usuario registrado exitosamente");
        navigate("/"); // Redirige al login
      } else {
        alert("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div>
      <h1>Registrar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" onChange={handleChange} required />
        </label>
        <br />
        <label>
          Apellidos:
          <input
            type="text"
            name="apellidos"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Edad:
          <input type="text" name="edad" onChange={handleChange} required />
        </label>
        <br />
        <label>
          Estrato:
          <input
            type="text"
            name="estrato"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Ciudad:
          <input type="text" name="ciudad" onChange={handleChange} required />
        </label>
        <br />
        <label>
          Usuario:
          <input type="text" name="user" onChange={handleChange} required />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Registrar;