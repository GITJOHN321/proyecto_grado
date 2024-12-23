import { createContext, useContext, useEffect, useState } from "react";
import { publicationRequest, getPublicationsJac, getPublicationJac, getCommentsUser, postComments } from "../api/publication";
import { proyectRequest, onlyProyectRequest } from "../api/proyect.js";

export const PubliContext = createContext();

export const usePublication = () => {
  const context = useContext(PubliContext);
  if (!context) {
    throw new Error("usePublication must be used within an PubliProvider");
  }
  return context;
};

export const PubliProvider = ({ children }) => {
  
  const [reload, setReload] = useState(false);
  const [errors, setErrors] = useState([]);
  const [openFormPublication, setOpenFormPublication] = useState(false);
  const [openFormReunion, setOpenFormReunion] = useState(false);
 
 
  
  const getPublicPublications = async () => {
    try {
      const res = await publicationRequest();
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const getJacPublications = async (id) => {
    try {
      const res = await getPublicationsJac(id);
      console.log(res.data)
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const getPublication = async (id) => {
    try {
      const res = await getPublicationJac(id);
      console.log(res.data)
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const getComments = async (id) => {
    try {
      const res = await getCommentsUser(id);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const sendComments = async(user)=>{
    try {
      const res = await postComments(user)
    } catch (error) {
      setErrors(error.response.data);
    }
  }
  const getAllProyects = async () => {
    try {
      const res = await proyectRequest();
      
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const getProyect = async (id) =>{
    try {
      const res = await onlyProyectRequest(id);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <PubliContext.Provider value={{ getPublicPublications, getAllProyects, getProyect, errors, getJacPublications,  getComments, getPublication, sendComments, openFormPublication, setOpenFormPublication, openFormReunion, setOpenFormReunion}}>
      {children}
    </PubliContext.Provider>
  );
};
