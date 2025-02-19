import axios from "./axios";

export const proyectRequest = () => axios.get(`/proyects`);
export const onlyProyectRequest = (id) => axios.get(`/proyect/${id}`);
export const getProyects = () => axios.get(`/my-proyects`);

export const notesRequest = (id) => axios.get(`/notes/${id}`);