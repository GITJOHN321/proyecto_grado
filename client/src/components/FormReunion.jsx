import { usePublication } from "../context/PublicationsContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import formatFecha from "../config/convertdate";
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
            <input
              type="text"
              {...register("type_meet", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Tipo de reunión (presencial, virtual)"
              defaultValue={meet && meet.type_meet}
            />
            {errors.type_meet && (
              <span className="text-red-500">type_meet is required</span>
            )}
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
            <input
              type="text"
              {...register("url_meet", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Dirección o lugar"
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
