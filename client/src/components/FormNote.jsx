import { usePublication } from "../context/PublicationsContext";
import { Link } from "react-router-dom";
function FromNote() {
  const { openFormNote, setOpenFormNote } = usePublication();

  const toggleModal = (e) => {
    setOpenFormNote(!openFormNote);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="bg-white rounded-md p-4 ">
          <h1 className="head">Crear Nota</h1>
          <Link onClick={(e) => toggleModal(e)} className="link">
            Cerrar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FromNote;