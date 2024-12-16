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
      console.log(errors.length);
      const res = await getProyect(id);
      setProyect(res);
    }

    loadProyect();
  }, []);

  return (
    <div>
      {errors.length != 0 ? (
        <h1>pagina no encontrada</h1>
      ) : (
        <h1>{proyect.state}</h1>
      )}
    </div>
  );
}

export default ProyectDetailPage;
