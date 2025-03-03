import { usePublication } from "../context/PublicationsContext.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardProyect from "../components/CardProyect.jsx";
import FormNewProject from "../components/FormNewProject.jsx";

function MyProyectsPage() {
  const [proyects, setProyects] = useState([]);
  const [list_proyects, setListProyects] = useState([]);
  const { getMyProyect, myProjects, setMyProjects, openFormProject, setOpenFormProject, setProyect  } = usePublication();

  const toggleModal = () => {
    setProyect(null);
    setOpenFormProject(!openFormProject);
  };

  useEffect(() => {
    async function loadProyects() {
      const res = await getMyProyect();
      console.log(res);
      setProyects(res);
      setMyProjects(res);
    }

    loadProyects();
  }, []);
  return (
    <div>
       {openFormProject && <FormNewProject></FormNewProject>}
      <div className="flex my-4 justify-center">
        <div className="row-span-2 overflow-auto touch-pan-y px-20">
          <h1 className="title text-center py-5">MIS PROYECTOS</h1>
          <button className="bg-transparent border-4 border-sky-500 border-dashed text-sky-500 hover:bg-sky-100 max-w-2xl w-full px-5 py-5 rounded-md  mb-5  hover:scale-105 transform duration-300"  onClick={() => toggleModal()}>
            Crear Nuevo Proyecto
          </button>
          {myProjects.length < 1 ? (
            <p>No hay coincidencias</p>
          ) : (
            <>
              {myProjects.map((proyect, i) => (
                <CardProyect key={i} proyect={proyect}  index={i} permission={true}></CardProyect>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default MyProyectsPage;
