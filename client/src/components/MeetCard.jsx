import { useState } from "react";
import { Link } from "react-router-dom";
import { usePublication } from "../context/PublicationsContext";
import formatFecha from "../config/convertdate";

function MeetCard(field) {
  const { meet, permission, index } = field;
  const { openFormReunion, setOpenFormReunion, meetings, setMeetings, setMeet,killPublication } = usePublication();

  meet.date = formatFecha(meet.created_at);
  meet.horario = formatFecha(meet.datetime);
  
  const toggleModal = () => {
    setMeet(meet);
    setOpenFormReunion(!openFormReunion);
  };

  const removeFields = async (index) => {
    let data = [...meetings];
    data.splice(index, 1);
    setMeetings(data);
    await killPublication(meet.publication_id)
  };
  return (
    <div className="w-full bg-white rounded-md border-2 my-4 overflow-auto">
      <header className="px-4 py-2 border-b-2 ">
        <div className="flex justify-between">
          <div className="break-all">
            <h1 className="font-semibold">{meet.title}</h1>
            <p className="subtitle text-nowrap">{meet.date}</p>
          </div>
          {permission && (
            <div className="grid grid-cols-1">
              <Link className="link" onClick={() => toggleModal()}>Editar</Link>
              <Link
                className="link"
                onClick={() => {
                  removeFields(index);
                }}
              >
                Eliminar
              </Link>
            </div>
          )}
        </div>
      </header>
      <div className="  p-4">
        <div className={"overflow-hidden max-h-28 pb-2"}>
          <p className={`font-light text-gray-800 `}>{meet.content}</p>
        </div>
        <h2 className="subtitle">
          <p className="inline-block font-semibold">Horario: </p>
          &nbsp;
          {meet.horario}
        </h2>
        <h2 className="subtitle">
          <p className="inline-block font-semibold">Tipo: </p>
          &nbsp;
          {meet.type_meet}
        </h2>
        <h2 className="subtitle">
          <p className="inline-block font-semibold">Dirección: </p>
          &nbsp;
          <Link
            to={meet.type_meet == "virtual" ? meet.url_meet : ""}
            className={meet.type_meet == "virtual" ? "link" : ""}
          >
            {meet.url_meet}
          </Link>
        </h2>
      </div>
    </div>
  );
}
export default MeetCard;
