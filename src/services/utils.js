export const parseDate = (fecha) => {
  // Convertir la fecha en un objeto Date
  const fechaObjeto = new Date(fecha);

  // Obtener los componentes de la fecha
  const dia = fechaObjeto.getUTCDate().toString().padStart(2, "0");
  const mes = (fechaObjeto.getUTCMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan desde 0
  const anio = fechaObjeto.getUTCFullYear().toString();
  const horas = fechaObjeto.getUTCHours().toString().padStart(2, "0");
  const minutos = fechaObjeto.getUTCMinutes().toString().padStart(2, "0");
  const segundos = fechaObjeto.getUTCSeconds().toString().padStart(2, "0");

  // Construir la fecha en el formato deseado: dd/mm/aaaa hh:mm:ss
  const fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

  return fechaFormateada;
};
