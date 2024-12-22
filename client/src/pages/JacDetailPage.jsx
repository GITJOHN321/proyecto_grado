import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { usePublication } from "../context/PublicationsContext.jsx";
import { useState, useEffect } from "react";
import PublicationCard from "../components/PublicationCard.jsx";
import PerfilJac from "../components/PerfilJac.jsx";
import FloatPubliCard from "../components/FloatPubliCard.jsx";
import { PERFIL_JAC } from "../config/config";

function JacDetailPage() {
  const { getDetailJac } = useAuth();
  const { getJacPublications, openPubli, publi } = usePublication();
  const [jac, setJac] = useState([]);
  const [publications, setPublications] = useState([]);
  const { id } = useParams();
  PERFIL_JAC[0].rute = `/jacs/${id}`;



  useEffect(() => {
    async function loadJac() {
      const perfil = await getDetailJac(id);
      const publi = await getJacPublications(id);
      setJac(perfil);
      setPublications(publi);
    }

    loadJac();
  }, []);
  return (
    <div>
      <div className="grid grid-flow-row-dense grid-cols-3 grid-row-3 lg:px-52 bg-slate-50">
        <div className="col-span-2">
          <PerfilJac jac={jac}></PerfilJac>
        </div>
        <div className="col-span-2">
          <div className="">
            <h1 className="head">Publicaciones</h1>
            <div>
              {publications.map((publication,i) => (
                <div key={i}>
                  <PublicationCard  publication ={publication}></PublicationCard>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row-span-2">
          <div>REUNIONES</div>
          <div id="proyectos">dasfasdfdasf</div>
        </div>
      </div>
    </div>
  );
}

export default JacDetailPage;
