import axios from "./axios";

export const registerRequest = (user) => axios.post(`/register`, user);
export const registerJacRequest = (user) => axios.post(`/register-jac`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const verifyTokenRequest = () => axios.get("/verify");

export const getRoles = () => axios.get(`/rol`);
export const getJacs = () => axios.get(`/jacs`);
export const getRolesUser = (id) => axios.get(`/rol/${id}`);
export const asingRolUser = (user) => axios.post('/rol-user', user)
export const deleteRolUser = (user) => axios.put('/rol-user', user)