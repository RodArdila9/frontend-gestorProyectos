import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registrar from "./components/Registrar";
import Proyectos from "./components/Proyectos";
import CrearProyecto from "./components/CrearProyecto";
import ProyectoDetalles from "./components/ProyectoDetalles";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/crear-proyecto" element={<CrearProyecto />} />
        <Route path="/proyecto/:id" element={<ProyectoDetalles />} />
      </Routes>
    </div>
  );
}

export default App;