import { createContext, useContext, useEffect, useState } from "react";
import { publicationRequest } from "../api/publication";
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
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [errors, setErrors] = useState([]);
 
  
  const getPublicPublications = async () => {
    try {
      const res = await publicationRequest();
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
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
    <PubliContext.Provider value={{ getPublicPublications, getAllProyects, getProyect, errors }}>
      {children}
    </PubliContext.Provider>
  );
};
