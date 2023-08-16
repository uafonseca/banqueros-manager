const yaml = require("js-yaml");
let ngrokTunnelUrl = null; // Variable global para almacenar la URL del túnel

export async function getNgrokTunnelUrl() {
  try {
    if (ngrokTunnelUrl) {
      // Si la URL ya está en memoria, la retornamos directamente
      return ngrokTunnelUrl;
    }

    const response = await fetch("http://localhost:4040/api/tunnels", {});
    console.log("response====>>>", response);
    const data = yaml.safeLoad(response.data);
    const tunnels = data.tunnels;
    console.log(response);

    // Encuentra el túnel HTTP (puedes ajustar esto según tus necesidades)
    const httpTunnel = tunnels.find((tunnel) => tunnel.proto === "http");

    if (httpTunnel) {
      ngrokTunnelUrl = httpTunnel.public_url; // Guardamos la URL en la variable global
      return ngrokTunnelUrl;
    } else {
      console.error("No se encontró ningún túnel HTTP en ngrok.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la URL del túnel ngrok:", error.message);
    return null;
  }
}

// Llamar a la función para obtener la URL del túnel
export const API_URL = async () => {
  const url = await getNgrokTunnelUrl();
  if (url) {
    console.log("URL del túnel ngrok:", url);
  }

  return "https://ba01-152-207-253-90.ngrok-free.app";
};
