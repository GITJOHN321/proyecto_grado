import { usePublication } from "../context/PublicationsContext";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
function FormNewProject() {
  const {
    myProjects,
    setMyProjects,
    openFormProject,
    setOpenFormProject,
    proyect,
    createProyect,
    updateProyect,
  } = usePublication();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateField = (field) => {
    const index = myProjects.findIndex(
      (item) => item.proyect_id === proyect.proyect_id
    );
    myProjects[index].name_proyect = field.name_proyect;
    myProjects[index].description = field.description;
    myProjects[index].initial_budget = field.initial_budget;
    myProjects[index].location = field.location;
    myProjects[index].start_date = field.start_date;
    myProjects[index].stimated_time = field.stimated_time;
    myProjects[index].object = field.object;
  };
  const addField = (field) => {
    let newfield = field;
    setMyProjects([newfield, ...myProjects]);
  };
  const toggleModal = (e) => {
    setOpenFormProject(!openFormProject);
  };
  ////////////////////////////////////////////////////////////////////////////
  function convertirFechaISOaInput(isoDate) {
    const fecha = new Date(isoDate);
    const año = fecha.getUTCFullYear();
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
    const dia = fecha.getUTCDate().toString().padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  }
  ///////////////////////////////////////////////////////////////////////////
  const onSubmit = handleSubmit(async (data) => {
    data.author = user.username;
    data.neighborhood = user.neighborhood;

    if (proyect) {
      data.id = proyect.proyect_id;
      const newProyect = await updateProyect(data);
      console.log(newProyect);
      updateField(data);
    } else {
      data.state = "propuesta";
      const newProyect = await createProyect(data);
      data.proyect_id = newProyect.proyect_id
      addField(data);
    }

    setOpenFormProject(!openFormProject);
    console.log(data);
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <div className="bg-white rounded-md p-4 ">
          <h1 className="head">
            {" "}
            {proyect ? "Actualizar Proyecto" : "Crear Proyecto"}
          </h1>
          <form className="px-10" onSubmit={onSubmit}>
            <input
              type="text"
              {...register("name_proyect", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Nombre del Projecto"
              defaultValue={proyect && proyect.name_proyect}
            />
            {errors.name_project && (
              <span className="text-red-500">title is required</span>
            )}
            <textarea
              type="text"
              {...register("description", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Escribe una descripción..."
              defaultValue={proyect && proyect.description}
              rows={5}
              cols={30}
            />
            {errors.description && (
              <span className="text-red-500">description is required</span>
            )}
            <input
              type="text"
              {...register("location", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Lugar donde se ejecuta el proyecto"
              defaultValue={proyect && proyect.location}
            />
            {errors.location && (
              <span className="text-red-500">title is required</span>
            )}

            <input
              type="text"
              {...register("object", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Objetivo del Proyecto"
              defaultValue={proyect && proyect.object}
            />
            {errors.object && (
              <span className="text-red-500">title is required</span>
            )}
            <input
              type="number"
              {...register("initial_budget", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Presupuesto inicial"
              defaultValue={proyect && proyect.initial_budget}
            />
            {errors.object && (
              <span className="text-red-500">title is required</span>
            )}
            <input
              type="number"
              {...register("stimated_time", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Tiempo estimado (Semanas)"
              defaultValue={proyect && proyect.stimated_time}
            />
            {errors.object && (
              <span className="text-red-500">title is required</span>
            )}
            <input
              type="date"
              {...register("start_date", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Fecha de inicio Aproximada"
              defaultValue={
                proyect && convertirFechaISOaInput(proyect.start_date)
              }
            />
            {errors.object && (
              <span className="text-red-500">title is required</span>
            )}
            <button type="submit" className="button block">
              {proyect ? "Actualizar" : "Crear"}
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

export default FormNewProject;
