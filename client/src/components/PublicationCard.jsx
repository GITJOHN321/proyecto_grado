import { useState } from "react";
import { Link } from "react-router-dom";

function PublicationCard(field) {
  const { publication } = field;
  const [vermas, setVermas] = useState(false);


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
    const horaFormateada = new Intl.DateTimeFormat(
      "es-ES",
      opcionesHora
    ).format(fecha);

    // Concatenamos el formato deseado
    return `${fechaFormateada} a las ${horaFormateada}`;
  }

  function openParagraph(e) {
    e.preventDefault();
    setVermas(!vermas);
    console.log(vermas);
  }

  return (
    <div className="w-full bg-white rounded-md border-2 my-4">
      <header className="px-4 py-2 border-b-2 ">
        <div className="overflow-hidden">
        <h1 className="font-semibold text-wrap">{publication.title} - {publication.author}</h1>
        <p className="subtitle text-nowrap">{formatFecha(publication.created_at)}</p>
        </div>
   
      </header>
      <div className={`${vermas ? "" : "overflow-hidden max-h-28"}`}>
        <p className={`font-light  p-4 text-gray-800 `}>
          {publication.content}pasto largo simplemente el texto de relleno de
          las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de
          relleno estándar de las industrias desde el año 1500, cuando un
          impresor (N. del T. persona que se dedica a la imprenta) desconocido
          usó una galería de textos y los mezcló de tal manera que logró hacer
          un libro de textos especimen. No sólo sobrevivió 500 años, sino que
          tambien ingresó como texto de relleno en documentos electrónicos,
          quedando esencialmente igual al original. Fue popularizado en los 60s
          con la creación de las hojas "Letraset", las cuales contenian pasajes
          de Lorem Ipsum, y más recientemente con software de autoedición, como
          por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.{" "}
        </p>
        <img
          className="w-full h-full object-cover"
          src="https://tulua.gov.co/info/tulua_se/media/galeria7239.jpg"
          alt=""
        />
      </div>
      <Link
        className="flex justify-end link px-4"
        onClick={(e) => {
          openParagraph(e);
        }}
      >
        {vermas ? "ver menos" : "ver más"}
      </Link>
      <div className="grid grid-cols-3">
        <Link className="button-comment">Me gusta</Link>
        <Link className="button-comment" to={`/jacs/${publication.jac_id}/${publication.publication_id}`}>Comentar</Link>
        <Link className="button-comment">URL</Link>
      </div>
      
    </div>
  );
}
export default PublicationCard;
