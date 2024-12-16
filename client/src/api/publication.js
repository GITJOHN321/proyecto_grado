import axios from "./axios";

export const publicationRequest = () => axios.get(`/publication`);