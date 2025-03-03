import axios from "./axios";

export const getMeetingsPublicationJac = (id) => axios.get(`/meetings/${id}`);

export const createMeetJacRequest = (user) => axios.post("/meetings", user);
export const updateMeetJacRequest = (user) => axios.put(`/meetings/${user.publication_id}`,user)
export const deleteMeetJacRequest = (id) => axios.delete(`/meetings/${id}`)
