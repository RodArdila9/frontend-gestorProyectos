import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Nuevo: Manejo del estado de carga
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!username || !password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    setLoading(true); // Activar loading

    try {
      const response = await fetch(
        "http://localhost:8088/gestor/api/usuario/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userId", data.id); // Guardar el ID del usuario
        navigate("/proyectos"); // Redirigir a proyectos
      } else {
        alert("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false); // Desactivar loading
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading} // Desactivar mientras está cargando
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading} // Desactivar mientras está cargando
          />
        </label>
        <br />
        {loading && <p>Iniciando sesión...</p>} {/* Mensaje de carga */}
        <button type="submit" disabled={loading}>
          Ingresar
        </button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/registrar">Regístrate</Link>{" "}
      </p>
    </div>
  );
}

export default Login;
