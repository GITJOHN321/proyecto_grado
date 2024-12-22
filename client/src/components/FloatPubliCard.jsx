import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePublication } from "../context/PublicationsContext";
import { useAuth } from "../context/AuthContext";
function FloatPubliCard() {
  const { isAuthenticated } = useAuth();
  const [publication, setPublication] = useState([]);
  const [comments, setComments] = useState([]);
  const [load, setLoad] = useState(false);
  const { getPublication, getComments, sendComments } = usePublication();
  const { p_id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (isAuthenticated) {
      data.publication_id = publication.publication_id;
      const result = await sendComments(data);
      setLoad(!load);
      reset();
    } else {
      alert(`Inicia sesión para agregar un comentario`);
    }
  });

  function formatFecha(isoDate) {
    const fecha = new Date(isoDate);

    // Opciones para la fecha
    const opcionesFecha = { day: "numeric", month: "long" };
    const fechaFormateada = new Intl.DateTimeFormat(
      "es-ES",
      opcionesFecha
    ).format(fecha);

    // Opciones para la hora
    const opcionesHora = { hour: "numeric", minute: "numeric", hour12: true };
    const horaFormateada = new Intl.DateTimeFormat(
      "es-ES",
      opcionesHora
    ).format(fecha);

    // Concatenamos el formato deseado
    return `${fechaFormateada} a las ${horaFormateada}`;
  }

  useEffect(() => {
    async function loadJac() {
      const res = await getPublication(p_id);
      const res2 = await getComments(p_id);
      console.log(res2);
      res.date = formatFecha(res.created_at);

      setPublication(res);
      setComments(res2);
    }

    loadJac();
  }, [load]);

  return (
    <div className="sm:fixed sm:inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className=" bg-white  rounded shadow-lg overflow-auto sm:grid grid-cols-2 xl:mx-64 h-screen ">
        <div className="bg-white rounded-md p-4 ">
          <header className="px-4 py-2 border-b-2 ">
            <div className="overflow-hidden">
              <h1 className="font-semibold text-wrap">
                {publication.title} - {publication.author}
              </h1>
              <p className="subtitle text-nowrap">{publication.date}</p>
            </div>
          </header>
          <div>
            <p className={`font-light  p-4 text-gray-800 `}>
              {publication.content}pasto largo simplemente el texto de relleno
              de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto
              de relleno estándar de las industrias desde el año 1500, cuando un
              impresor (N. del T. persona que se dedica a la imprenta)
              desconocido usó una galería de textos y los mezcló de tal manera
              que logró hacer un libro de textos especimen. No sólo sobrevivió
              500 años, sino que tambien ingresó como texto de relleno en
              documentos electrónicos, quedando esencialmente igual al original.
              Fue popularizado en los 60s con la creación de las hojas
              "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más
              recientemente con software de autoedición, como por ejemplo Aldus
              PageMaker, el cual incluye versiones de Lorem Ipsum.{" "}
            </p>
            <div className=" flex justify-center ">
              <img
                className="h-96 object-cover"
                src="https://tulua.gov.co/info/tulua_se/media/galeria7239.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 overflow-y-auto">
            
            <h1 className="font-bold text-2xl m-2">Comentarios</h1>
      
          <div className="">
          {comments.map((comment, i) => (
            <div key={i} className="">
              <div className="border-2 p-2 m-2 rounded-lg">
                <div className="overflow-hidden">
                  <h1 className="font-semibold text-wrap">{comment.author}</h1>
                  <p className="font-thin text-nowrap text-xs">
                    {formatFecha(comment.created_at)}
                  </p>
                </div>
                <div>
                  <p className={`font-light text-gray-800 `}>
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
          </div>
          <div className="">
          <form className="mx-2 py-4" onSubmit={onSubmit}>
            <input
              type="text"
              {...register("content", { required: true })}
              className="w-full input px-4 py-2 rounded-md"
              placeholder="Escribe un comentario..."
            />
            <button type="submit" className="button">
              Enviar
            </button>
          </form>
          <div className="flex justify-end mx-2 py-4">
            <Link
              to={`/jacs/${publication.jac_id}`}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cerrar
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FloatPubliCard;
