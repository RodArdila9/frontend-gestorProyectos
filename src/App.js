import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Registrar from "./components/Registrar";
import Proyectos from "./components/Proyectos";
import CrearProyecto from "./components/CrearProyecto";
import ProyectoDetalles from "./components/ProyectoDetalles";
import Navbar from "./components/Navbar"; // Importamos la barra de navegación

function App() {
  // Usamos un Wrapper para manejar el Navbar
  const AppWrapper = () => {
    const location = useLocation(); // Obtén la ruta actual

    // Verificar si estamos en rutas donde no queremos mostrar el Navbar
    const hideNavbar = location.pathname === "/login" || location.pathname === "/registrar";

    return (
      <>
        {!hideNavbar && <Navbar />} {/* Mostrar Navbar solo si no estamos en /login o /registrar */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/crear-proyecto" element={<CrearProyecto />} />
          <Route path="/proyecto/:id" element={<ProyectoDetalles />} />
        </Routes>
      </>
    );
  };

  return <AppWrapper />;
}

export default App;