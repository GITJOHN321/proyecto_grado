import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { usePublication } from "../context/PublicationsContext.jsx";
import { useState, useEffect } from "react";
import PublicationCard from "../components/PublicationCard.jsx";
import MeetCard from "../components/MeetCard.jsx";
import PerfilJac from "../components/PerfilJac.jsx";
import FormPublication from "../components/FormPublication.jsx";
import FormReunion from "../components/FormReunion.jsx";

function JacDetailPage() {
  const { getDetailJac, user, isAuthenticated } = useAuth();
  const {
    getJacPublications,
    openFormPublication,
    setOpenFormPublication,
    openFormReunion,
    setOpenFormReunion,
    setPublications,
    publications,
    meetings,
    setMeetings,
    getMeetingsJac,
    setMeet
  } = usePublication();
  const [jac, setJac] = useState([]);
  const { id } = useParams();

  const toggleModal = () => {
    setOpenFormPublication(!openFormPublication);
  };
  const toggleModalReunion = () => {
    setMeet(null)
    setOpenFormReunion(!openFormReunion);
  };

  function permissions() {
    if (isAuthenticated) {
      if (user.user_id == id) {
        return true;
      } else {
        return false;
      }
    }
  }

  useEffect(() => {
    async function loadJac() {
      const perfil = await getDetailJac(id);
      const publi = await getJacPublications(id);
      await getMeetingsJac(id);
      setJac(perfil);
      setPublications(publi);
    }

    loadJac();
  }, []);
  return (
    <div>
      {openFormPublication && <FormPublication></FormPublication>}
      {openFormReunion && <FormReunion></FormReunion>}
      <div className="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3 grid-row-3 px-5 sm:px-24 md:px-32 xl:px-52 bg-slate-100">
        <div className="col-span-2">
          <PerfilJac jac={jac}></PerfilJac>
        </div>
        <div className="col-span-2">
          <div className="">
            <h1 className="head flex justify-between">
              Publicaciones{" "}
              {permissions() && (
                <Link onClick={() => toggleModal()} className="link">
                  Crear +
                </Link>
              )}
            </h1>
            <div className="max:h-screen overflow-auto py-2">
              {publications.map((publication, i) => (
                <div key={i}>
                  <PublicationCard
                    permission={permissions()}
                    publication={publication}
                    index={i}
                  ></PublicationCard>
                </div>
              ))}
            </div>
          </div> 
        </div>
        <div className=" w-full mb-4 mx-2 row-span-2">
          <div className="">
            <h1 className="head flex justify-between">
              Reuniones{" "}
              {permissions() && (
                <Link onClick={() => toggleModalReunion()} className="link">
                  Crear+
                </Link>
              )}
            </h1>
            <div className="overflow-auto p-2">
              {meetings.map((meet, i) => (
                <div key={i}>
                  <MeetCard
                    permission={permissions()}
                    meet={meet}
                    index={i}
                  ></MeetCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JacDetailPage;
