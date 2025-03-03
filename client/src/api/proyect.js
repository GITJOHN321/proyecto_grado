import axios from "./axios";

export const proyectRequest = () => axios.get(`/proyects`);
export const onlyProyectRequest = (id) => axios.get(`/proyect/${id}`);
export const getProyects = () => axios.get(`/my-proyects`);

export const notesRequest = (id) => axios.get(`/notes/${id}`);

export const createProyectRequest = (user) => axios.post("/proyects", user);
export const updateProyectRequest = (user) => axios.put(`/proyects/${user.id}`,user)
export const deleteProyectRequest = (id) => axios.delete(`/proyects/${id}`)

export const createNoteProyectRequest = (user) => axios.post("/notes",user)
export const updateNoteProyectRequest = (user) => axios.put(`/notes/${user.note_id}`,user)
export const deleteNoteProyectRequest = (id) => axios.delete(`/notes/${id}`)