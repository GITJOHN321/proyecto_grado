import { usePublication } from "../context/PublicationsContext.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function PublicationPage() {
  const [proyects, setProyects] = useState([]);
  const { getAllProyects } = usePublication();

  useEffect(() => {
    async function loadProyects() {
      const res = await getAllProyects();
      console.log(res);
      setProyects(res);
    }

    loadProyects();
  }, []);

  return (
    <div className="">
      <div className="flex my-4 justify-center">
        <div className="row-span-2 overflow-auto touch-pan-y px-20">
          {proyects.map((proyect, i) => (
            <div
              className="bg-white border-2 border-slate-200 max-w-2xl w-full px-5 py-5 rounded-md shadow-lg"
              key={i}
            >
              <header className=" pb-2 border-b-2 mx-4">
                <h1 className="title">{proyect.name_proyect}</h1>
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="subtitle">
                      <p className="inline-block font-bold">Author: </p>{" "}
                      {proyect.author}
                    </h3>
                  </div>
                  <div className="inline-flex items-center">
                    <Link className="link" to={`/proyects/${proyect.proyect_id}`}>
                      Ver Proyecto
                    </Link>
                  </div>
                </div>
              </header>

              <div className="relative max-h-52 overflow-auto p-4 text-gray-800">
                <p className="">
                  {proyect.description} simplemente el texto de relleno de las
                  imprentas y archivos de texto. Lorem Ipsum ha sido el texto de
                  relleno estándar de las industrias desde el año 1500, cuando
                  un impresor (N. del T. persona que se dedica a la imprenta)
                  desconocido usó una galería de textos y los mezcló de tal
                  manera que logró hacer un libro de textos especimen. No sólo
                  sobrevivió 500 años, sino que tambien ingresó como texto de
                  relleno en documentos electrónicos, quedando esencialmente
                  igual al original. Fue popularizado en los 60s con la creación
                  de las hojas "Letraset", las cuales contenian pasajes de Lorem
                  Ipsum, y más recientemente con software de autoedición, como
                  por ejemplo Aldus PageMaker, el cual incluye versiones de
                  Lorem Ipsum.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default PublicationPage;
