import { usePublication } from "../context/PublicationsContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import formatFecha from "../config/convertdate";
import { useState } from "react";
function FormReunion() {
  const {
    openFormReunion,
    setOpenFormReunion,
    meetings,
    setMeetings,
    meet,
    setMeet,
    createMeet,
    updateMeet,
  } = usePublication();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [type_meet, setTypeMeet] = useState(meet ? meet.type_meet : null)
  const handleSelect = (option) => {
    setTypeMeet(option)
    setIsOpen(false); // Cierra el menú después de seleccionar
  };

  const addField = (field) => {
    let newfield = field;
    setMeetings([newfield, ...meetings]);
  };



  const updateField = (field) => {
    const index = meetings.findIndex(
      (item) => item.publication_id === meet.publication_id
    );
    meetings[index].title = field.title;
    meetings[index].content = field.content;
    meetings[index].datetime = field.datetime;
    meetings[index].type_meet = field.type_meet;
    meetings[index].date = field.date;
    meetings[index].hour = field.hour;
    meetings[index].url_meet = field.url_meet;
  };

  const toggleModal = (e) => {
    setOpenFormReunion(!openFormReunion);
  };
  const onSubmit = handleSubmit(async (data) => {
    data.public_ = true;
    data.type = "meet";
    data.datetime = `${data.date}T${data.hour}:00.000Z`;
    data.created_at = new Date();
    data.type_meet = type_meet

    if (meet) {
      data.publication_id = meet.publication_id;
      const newMeet = await updateMeet(data);
      console.log(data);
      updateField(data);
    } else {
      const newMeet = await createMeet(data);
      console.log(data);
      addField(data);
    }
    toggleModal();
    console.log(data);
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <div className="bg-white rounded-md p-4 ">
          <h1 className="head">Crear Nueva Reunión</h1>
          <form className="" onSubmit={onSubmit}>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Tema de la reunión"
              defaultValue={meet && meet.title}
            />
            {errors.title && (
              <span className="text-red-500">title is required</span>
            )}
            <textarea
              type="text"
              {...register("content", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Escribe una descripción..."
              defaultValue={meet && meet.content}
              rows={5}
              cols={30}
            />
            {errors.content && (
              <span className="text-red-500">description is required</span>
            )}
            <label className="font-sans font-semibold text-sm">
              Selecciona el tipo de reunión
            </label>

            <div className="relative py-2">
              {/* Botón para abrir/cerrar el menú */}
              <button
                type="button"
                onClick={(e) =>  setIsOpen(!isOpen)}
                className="py-1 px-2 bg-slate-600 hover:bg-sky-500 text-white font-medium text-sm rounded-lg"
              >
                Tipo de Runión
              </button>

              {/* Menú desplegable */}
              {isOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <ul className="py-2 text-gray-700">
                    <li
                      onClick={() => handleSelect("presencial")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      presencial
                    </li>
                    <li
                      onClick={() => handleSelect("virtual")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      virtual
                    </li>
                  </ul>
                </div>
              )}
              <span className="inline-block px-5 align-baseline">{type_meet}</span>
            </div>
              
            <label className="font-sans font-semibold text-sm">
              Fecha de la reunión
            </label>
            <input
              type="date"
              {...register("date", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Fecha y hora"
              defaultValue={meet && meet.date}
            />
            {errors.date && (
              <span className="text-red-500">type_meet is required</span>
            )}
            <label className="font-sans font-semibold text-sm">
              Hora de la reunión
            </label>
            <input
              type="time"
              {...register("hour", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Hora"
              defaultValue={meet && meet.hour}
            />
            {errors.hour && (
              <span className="text-red-500">type_meet is required</span>
            )}
            <label className="font-sans font-semibold text-sm">
              {type_meet =="presencial" ? "Lugar" : "URL"}
            </label>
            <input
              type={type_meet == "presencial" ? "text":"url"}
              {...register("url_meet", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder={type_meet == "presencial" ? "Dirección o lugar": "Pega la URL de la reunión"}
              defaultValue={meet && meet.url_meet}
            />
            {errors.url_meet && (
              <span className="text-red-500">url_meet is required</span>
            )}
            <button type="submit" className="button block">
              {" "}
              Crear{" "}
            </button>
          </form>
          <Link onClick={(e) => toggleModal(e)} className="link">
            Cerrar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FormReunion;
