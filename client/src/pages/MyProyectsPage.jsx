import { usePublication } from "../context/PublicationsContext.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardProyect from "../components/CardProyect.jsx";

function MyProyectsPage() {
  const [proyects, setProyects] = useState([]);
  const [list_proyects, setListProyects] = useState([]);
  const { getMyProyect } = usePublication();

  useEffect(() => {
    async function loadProyects() {
      const res = await getMyProyect();
      console.log(res);
      setProyects(res);
      setListProyects(res);
    }

    loadProyects();
  }, []);
  return (
    <div>
      <div className="flex my-4 justify-center">
        <div className="row-span-2 overflow-auto touch-pan-y px-20">
            <h1 className="title text-center py-5">MIS PROYECTOS</h1>
            <button className="bg-transparent border-4 border-sky-500 border-dashed text-sky-500 hover:bg-sky-100 max-w-2xl w-full px-5 py-5 rounded-md  mb-5  hover:scale-105 transform duration-300">Crear Nuevo Proyecto</button>
          {list_proyects.length < 1 ? (
            <p>No hay coincidencias</p>
          ) : (
            <>
              {list_proyects.map((proyect, i) => (
                <CardProyect key={i} proyect={proyect}></CardProyect>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default MyProyectsPage;
