import { usePublication } from "../context/PublicationsContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
function FromNote(field) {
  const { id } = field;
  const {
    openFormNote,
    setOpenFormNote,
    notes,
    setNotes,
    note,
    setNote,
    createNoteProyect,
    updateNoteProyect,
  } = usePublication();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateField = (field) => {
    const index = notes.findIndex((item) => item.note_id === note.note_id);
    notes[index].title = field.title;
    notes[index].description = field.description;
  };
  const addField = (field) => {
    let newfield = field;
    setNotes([newfield, ...notes]);
  };
  const toggleModal = (e) => {
    setOpenFormNote(!openFormNote);
  };

  const onSubmit = handleSubmit(async (data) => {
    data.proyect_id = id;

    if (note) {
      data.note_id = note.note_id;
      const newNote = await updateNoteProyect(data);

      console.log(note);
      updateField(data);
    } else {
      const newNote = await createNoteProyect(data);
      console.log(data);
      addField(data);
    }

    console.log(data);
    toggleModal();
  });
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="bg-white rounded-md p-4 ">
          <h1 className="head">Crear Nota</h1>
          <form className="" onSubmit={onSubmit}>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="titulo de la nota"
              defaultValue={note && note.title}
            />
            {errors.title && (
              <span className="text-red-500">Escribe un titulo</span>
            )}
            <textarea
              type="text"
              {...register("description", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Escribe una descripción..."
              defaultValue={note && note.description}
              rows={5}
              cols={30}
            />
            {errors.description && (
              <span className="text-red-500">Escribe una descripción</span>
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

export default FromNote;
