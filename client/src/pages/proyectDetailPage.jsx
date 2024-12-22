import { usePublication } from "../context/PublicationsContext.jsx";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function ProyectDetailPage() {
  const { getProyect, errors } = usePublication();
  const [proyect, setProyect] = useState("");
  const { id } = useParams();

  useEffect(() => {
    console.log(errors);
    async function loadProyect() {
      const res = await getProyect(id);
      console.log(res);
      setProyect(res);
    }

    loadProyect();
  }, []);

  return (
    <div>
      {errors.length != 0 ? (
        <h1>pagina no encontrada</h1>
      ) : (
        <div className="container-form px-40">
          <div className=" containter-into-form bg-white rounded-md border-2 my-4">
            <header className="px-4 py-2 border-b-2 ">
              <div className="overflow-hidden">
                <h1 className="font-semibold text-wrap">
                  adfadfa
                </h1>
                <p className="subtitle text-nowrap">
                 asdfsadf
                </p>
              </div>
            </header>
            <div>
              <p className={`font-light  p-4 text-gray-800 `}>
               adsfapasto largo simplemente el texto de relleno
                de las imprentas y archivos de texto. Lorem Ipsum ha sido el
                texto de relleno estándar de las industrias desde el año 1500,
                cuando un impresor (N. del T. persona que se dedica a la
                imprenta) desconocido usó una galería de textos y los mezcló de
                tal manera que logró hacer un libro de textos especimen. No sólo
                sobrevivió 500 años, sino que tambien ingresó como texto de
                relleno en documentos electrónicos, quedando esencialmente igual
                al original. Fue popularizado en los 60s con la creación de las
                hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y
                más recientemente con software de autoedición, como por ejemplo
                Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.{" "}
              </p>
              <img
                className="object-cover"
                src="https://tulua.gov.co/info/tulua_se/media/galeria7239.jpg"
                alt=""
              />
            </div>
            <Link
              className="flex justify-end link px-4"
         
            >
            
            </Link>
            <div className="grid grid-cols-3">
              <Link className="button-comment">Me gusta</Link>
              <Link
                className="button-comment"
              
              >
                Comentar
              </Link>
              <Link className="button-comment">URL</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProyectDetailPage;
