import { usePublication } from "../context/PublicationsContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import currentDate from "../config/currentDate";

function FormPublication() {
  const {
    openFormPublication,
    setOpenFormPublication,
    createPublication,
    resetErrors,
    errors: publicationErrors,
    publications,
    setPublications,
  } = usePublication();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleModal = (e) => {
    setOpenFormPublication(!openFormPublication);
  };

  const onSubmit = handleSubmit(async (data) => {
    data.public_ = true;

    const res = await createPublication(data);
    res.author = user.username;
    let newfield = res;
    setPublications([newfield, ...publications]);
    if (res) {
      setOpenFormPublication(!openFormPublication);
      resetErrors();
    }
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="bg-white rounded-md p-4 ">
          <h1 className="head">Crear Publicación</h1>
          <div>
            {publicationErrors.map((error, i) => (
              <div className="bg-red-500 p-2 text-white text-center" key={i}>
                {error}
              </div>
            ))}

            <form className="px-10" onSubmit={onSubmit}>
              <input
                type="text"
                {...register("title", { required: true })}
                className="w-full input px-4 py-2 rounded-md my-2"
                placeholder="titulo"
              />
              {errors.title && (
                <span className="text-red-500">title is required</span>
              )}
              <textarea
                type="text"
                {...register("content", { required: true })}
                className="w-full input px-4 py-2 rounded-md my-2"
                placeholder="Escribe una descripción..."
                rows={5}
                cols={30}
              />
              {errors.content && (
                <span className="text-red-500">description is required</span>
              )}
              <button type="submit" className="button block">
                {" "}
                Crear{" "}
              </button>
            </form>
          </div>
          <Link onClick={(e) => toggleModal(e)} className="link">
            Cerrar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FormPublication;
