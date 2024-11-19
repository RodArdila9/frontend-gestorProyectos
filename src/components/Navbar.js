import React, { useEffect, useState } from "react";
import CerrarSesion from "./CerrarSesion"; // Botón de cerrar sesión
import "../styles/Navbar.css"; // Importa los estilos

function Navbar() {
  const [role, setRole] = useState(""); // Estado para el rol del usuario

  useEffect(() => {
    // Obtener el rol desde localStorage al cargar el componente
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const roleClass = role === "admin" ? "navbar-admin" : "navbar-basico";
                            
  // Determinar el título dinámico según el rol
  const navbarTitle =
    role === "admin"
      ? "Gestor de solicitudes - REVISOR"
      : role === "Basico"
      ? "Gestor de solicitudes - SOLICITANTE"
      : "Gestor de solicitudes";

  return (
    <nav className="navbar">
      <div className="navbar-content">
      <h1 className={`navbar-title ${roleClass}`}>{navbarTitle}</h1>
        <CerrarSesion />
      </div>
    </nav>
  );
}

export default Navbar;