import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePublication } from "../context/PublicationsContext";

function CardProyect(field) {
  const { user } = useAuth();
  const { proyect, index,permission } = field;

  const {
    myProjects,
    setMyProjects,
    openFormProject,
    setOpenFormProject,
    setProyect,
    killProyect,
  } = usePublication();

  const toggleModal = () => {
    setProyect(proyect);
    setOpenFormProject(!openFormProject);
  };

  const removeFields = async (index) => {
    let data = [...myProjects];
    data.splice(index, 1);
    setMyProjects(data);
    await killProyect(proyect.proyect_id);
  };
  return (
    <div className="bg-white border-2 border-slate-200 max-w-2xl w-full px-5 py-5 rounded-md shadow-lg">
      <header className=" pb-2 border-b-2 mx-4">
        <h1 className="title  border-b-2 pb-2">{proyect.name_proyect}</h1>
        <div className="flex items-center pt-2">
          <div className="flex-1">
            <h3 className="subtitle">
              <p className="inline-block font-bold">Author: </p>{" "}
              {proyect.author}
            </h3>
            <h3 className="subtitle">
              <p className="inline-block font-bold">Barrio: </p>{" "}
              {proyect.neighborhood}
            </h3>
          </div>
          <div className="inline-flex items-center">
            <div className="grid grid-cols-1">
              <Link className="link" to={`/proyects/${proyect.proyect_id}`}>
                Ver Proyecto
              </Link>
              {permission && (
                <>
                  <Link
                    className="link"
                    onClick={() => {
                      removeFields(index);
                    }}
                  >
                    Eliminar
                  </Link>
                  <Link className="link" onClick={() => toggleModal()}>
                    Editar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-h-52 overflow-auto p-4 text-gray-800">
        <p className="">
          {proyect.description} simplemente el texto de relleno de las imprentas
          y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
          de las industrias desde el año 1500, cuando un impresor (N. del T.
          persona que se dedica a la imprenta) desconocido usó una galería de
          textos y los mezcló de tal manera que logró hacer un libro de textos
          especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como
          texto de relleno en documentos electrónicos, quedando esencialmente
          igual al original. Fue popularizado en los 60s con la creación de las
          hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más
          recientemente con software de autoedición, como por ejemplo Aldus
          PageMaker, el cual incluye versiones de Lorem Ipsum.
        </p>
      </div>
    </div>
  );
}
export default CardProyect;
