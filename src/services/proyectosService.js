export const fetchProyectosService = async () => {
  const url = "http://localhost:8088/gestor/api/proyectos/listar";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al cargar proyectos");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error de red: no se pudo conectar al servidor");
  }
};
