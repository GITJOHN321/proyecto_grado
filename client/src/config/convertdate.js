function formatFecha(isoDate) {
  const fecha = new Date(isoDate);
  // Opciones para la fecha
  const opcionesFecha = { day: "numeric", month: "long" };
  const fechaFormateada = new Intl.DateTimeFormat(
    "es-ES",
    opcionesFecha
  ).format(fecha);

  // Opciones para la hora
  const opcionesHora = { hour: "numeric", minute: "numeric", hour12: true };
  const horaFormateada = new Intl.DateTimeFormat("es-ES", opcionesHora).format(
    fecha
  );

  // Concatenamos el formato deseado
  return `${fechaFormateada} a las ${horaFormateada}`;
}

export default formatFecha;
