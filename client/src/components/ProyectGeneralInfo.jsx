import { Link, useParams } from "react-router-dom";
import formatFecha from "../config/convertdate";
function ProyectGeneralInfo(f) {
  const { proyect } = f;

  return (
    <div>
      <div className="border-b-2 pb-2">
        <h1 className="font-bold text-2xl">{proyect.name_proyect}</h1>

        <div className="subtitle">
          <h1>{proyect.author}</h1>
          <h1>{proyect.created_at}</h1>
        </div>
      </div>
      <p className="font-serif  text-gray-800 py-4 ">
        {proyect.description} simplemente el texto de relleno de las imprentas y
        archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
        las industrias desde el año 1500, cuando un impresor (N. del T. persona
        que se dedica a la imprenta) desconocido usó una galería de textos y los
        mezcló de tal manera que logró hacer un libro de textos especimen. No
        sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno
        en documentos electrónicos, quedando esencialmente igual al original.
        Fue popularizado en los 60s con la creación de las hojas "Letraset", las
        cuales contenian pasajes de Lorem Ipsum, y más recientemente con
        software de autoedición, como por ejemplo Aldus PageMaker, el cual
        incluye versiones de Lorem Ipsum.
      </p>
      <div className=" flex justify-center">
        <img
          className="h-96 object-cover"
          src="https://tulua.gov.co/info/tulua_se/media/galeria7239.jpg"
          alt=""
        />
      </div>
      <div className=" pt-4">
        <h1 className="text-xl font-bold">Objetivo:</h1>
        <p>{proyect.object}</p>
      </div>
      <div className="grid sm:grid-cols-2 py-4">
        <h3 className="subtitle">
          <p className="inline-block font-bold">Presupuesto Inicial: </p>{" "}
          {proyect.initial_budget}
        </h3>
        <h3 className="subtitle">
          <p className="inline-block font-bold">Lugar: </p> {proyect.location}
        </h3>
        <h3 className="subtitle">
          <p className="inline-block font-bold">Fecha de inicio: </p>{" "}
          {proyect.start_date}
        </h3>
        <h3 className="subtitle">
          <p className="inline-block font-bold">Estado: </p> {proyect.state}
        </h3>
        <h3 className="subtitle">
          <p className="inline-block font-bold">Tiempo estimado: </p>{" "}
          {proyect.stimated_time}
        </h3>
        <h3 className="subtitle">
          <p className="inline-block font-bold">Presupuesto Inicial: </p>{" "}
          {proyect.initial_budget}
        </h3>
      </div>
    </div>
  );
}

export default ProyectGeneralInfo;
