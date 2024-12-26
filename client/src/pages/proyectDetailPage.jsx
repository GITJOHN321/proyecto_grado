import { usePublication } from "../context/PublicationsContext.jsx";
import { useState, useEffect } from "react";
import ProyectGeneralInfo from "../components/ProyectGeneralInfo.jsx";
import CardNotesProyect from "../components/CardNoteProyect.jsx";
import FromNote from "../components/FormNote.jsx";
import { Link, useParams } from "react-router-dom";
import formatFecha from "../config/convertdate.js";
import { useAuth } from "../context/AuthContext.jsx";

function ProyectDetailPage() {
  const {
    getProyect,
    errors,
    getNotesProyect,
    notes,
    setNotes,
    openFormNote,
    setOpenFormNote,
  } = usePublication();
  const { user, isAuthenticated } = useAuth();
  const [proyect, setProyect] = useState("");
  const { id } = useParams();

  const toggleModal = () => {
    setOpenFormNote(!openFormNote);
  };

  function permissions() {
    if (isAuthenticated) {
      if (user.user_id == proyect.jac_id) {
        return true;
      } else {
        return false;
      }
    }
  }

  useEffect(() => {
    async function loadProyect() {
      const res = await getProyect(id);
      const res2 = await getNotesProyect(id);
      res.created_at = formatFecha(res.created_at);
      res.start_date = formatFecha(res.start_date);
      setProyect(res);
      setNotes(res2);
    }

    loadProyect();
  }, []);

  return (
    <div>
      {errors.length != 0 ? (
        <h1>pagina no encontrada</h1>
      ) : (
        <div>
          {openFormNote && <FromNote></FromNote>}
          <div className="grid grid-flow-row-dense grid-cols-1 pt-5 lg:grid-cols-3 grid-row-2 px-10 sm:px-24 xl:px-52 gap-x-4">
            <div className="lg:col-span-2 child-grid">
              <ProyectGeneralInfo proyect={proyect}></ProyectGeneralInfo>
            </div>
            <div className="lg:col-span-2 child-grid">
              <h1 className="flex justify-between px-4 pt-4 font-bold text-2xl">
                Notas del Proyecto
                {permissions() && (
                  <Link onClick={() => toggleModal()} className="link">
                    Crear +
                  </Link>
                )}
              </h1>
              <div className="max:h-screen overflow-auto">
                {notes.map((note, i) => (
                  <CardNotesProyect
                    permission={permissions()}
                    note={note}
                    index={i}
                  ></CardNotesProyect>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1 child-grid">
              <h1>Historial de informes</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProyectDetailPage;
