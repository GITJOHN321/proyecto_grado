import { usePublication } from "../context/PublicationsContext.jsx";
import { useState, useEffect } from "react";
import ProyectGeneralInfo from "../components/ProyectGeneralInfo.jsx";
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
        <ProyectGeneralInfo proyect={proyect}></ProyectGeneralInfo>
      )}
    </div>
  );
}

export default ProyectDetailPage;
