import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Proyectos from "./components/Proyectos";
import CrearProyecto from "./components/CrearProyecto";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/crear-proyecto" element={<CrearProyecto />} />
      </Routes>
    </div>
  );
}

export default App;