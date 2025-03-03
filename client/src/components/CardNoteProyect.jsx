import { useState } from "react";
import { Link } from "react-router-dom";
import { usePublication } from "../context/PublicationsContext";

function CardNotesProyect(field) {
  const { notes, setNotes, openFormNote, setOpenFormNote, setNote,killNoteProyect } = usePublication();
  const [vermas, setVermas] = useState(false);
  const { note, permission, index } = field;

  const toggleModal = () => {
    setNote(note);
    setOpenFormNote(!openFormNote);
  };
  const removeFields = async(index) => {
    let data = [...notes];
    data.splice(index, 1);
    setNotes(data);
    await killNoteProyect(note.note_id)
  };
 
  function openParagraph(e) {
    e.preventDefault();
    setVermas(!vermas);
    console.log(vermas);
  }
  return (
    <div>
      <div className=" my-4 border-2 border-sky-100 rounded-lg">
        <header className="px-4 py-2 border-b-2 ">
          <div className="flex justify-between">
            <div>
              <h1 className="font-semibold text-wrap break-words">
                {note.title}
              </h1>
              <p className="subtitle text-nowrap">aqui va la fecha</p>
            </div>
            {permission && (
              <div>
                <Link onClick={() => toggleModal()} className="link">
                  Editar
                </Link>
                <Link
                  onClick={() => {
                    removeFields(index);
                  }}
                  className="link"
                >
                  Eliminar
                </Link>
              </div>
            )}
          </div>
        </header>
        <div className={`${vermas ? "" : "overflow-hidden max-h-28"}`}>
          <p className={`font-light  p-4 text-gray-800 `}>
            {note.description}pasto largo simplemente el texto de relleno de las
            imprentas y archivos de texto. Lorem Ipsum ha sido el texto de
            relleno estándar de las industrias desde el año 1500, cuando un
            impresor (N. del T. persona que se dedica a la imprenta) desconocido
            usó una galería de textos y los mezcló de tal manera que logró hacer
            un libro de textos especimen. No sólo sobrevivió 500 años, sino que
            tambien ingresó como texto de relleno en documentos electrónicos,
            quedando esencialmente igual al original. Fue popularizado en los
            60s con la creación de las hojas "Letraset", las cuales contenian
            pasajes de Lorem Ipsum, y más recientemente con software de
            autoedición, como por ejemplo Aldus PageMaker, el cual incluye
            versiones de Lorem Ipsum.{" "}
          </p>
          <div className="flex justify-center">
            <img
              className="h-96 object-cover"
              src="https://tulua.gov.co/info/tulua_se/media/galeria7239.jpg"
              alt=""
            />
          </div>
        </div>
        <Link
          className="flex justify-end link px-4"
          onClick={(e) => {
            openParagraph(e);
          }}
        >
          {vermas ? "ver menos" : "ver más"}
        </Link>
      </div>
    </div>
  );
}
export default CardNotesProyect;
