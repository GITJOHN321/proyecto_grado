import axios from "./axios";

export const publicationRequest = () => axios.get(`/publication`);
export const getPublicationsJac = (id) => axios.get(`/publications/${id}`);
export const getPublicationJac = (id) => axios.get(`/publication/${id}`);

export const getCommentsUser = (id) => axios.get(`/comments/${id}`);
export const postComments = (user) => axios.post(`/comments`, user)

export const postPublication = (user) => axios.post(`/publication`, user)