import { createContext, useContext, useEffect, useState } from "react";
import {
  publicationRequest,
  getPublicationsJac,
  getPublicationJac,
  getCommentsUser,
  postComments,
  postPublication,
  putPublication,
  deletePublication
} from "../api/publication";
import {
  proyectRequest,
  onlyProyectRequest,
  notesRequest,
} from "../api/proyect.js";

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
  const [openFormNote, setOpenFormNote] = useState(false);
  const [publications, setPublications] = useState([]);
  const [publication, setPublication] = useState(null);
  const [notes, setNotes] = useState([]);

  const resetErrors = () => {
    setErrors([]);
  };

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
      console.log(res.data);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const createPublication = async (user) => {
    try {
      const res = await postPublication(user);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const killPublication = async (id) => {
    try {
      const res = await deletePublication(id);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const updatePublication = async (user) => {
    try {
      const res = await putPublication(user);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const getPublication = async (id) => {
    try {
      const res = await getPublicationJac(id);
      console.log(res.data);
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
  const sendComments = async (user) => {
    try {
      const res = await postComments(user);
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

  const getProyect = async (id) => {
    try {
      const res = await onlyProyectRequest(id);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const getNotesProyect = async (id) => {
    try {
      const res = await notesRequest(id);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <PubliContext.Provider
      value={{
        getPublicPublications,
        getAllProyects,
        getProyect,
        errors,
        getJacPublications,
        getComments,
        getPublication,
        sendComments,
        openFormPublication,
        setOpenFormPublication,
        openFormReunion,
        setOpenFormReunion,
        publications,
        setPublications,
        getNotesProyect,
        notes,
        setNotes,
        openFormNote,
        setOpenFormNote,
        createPublication,
        resetErrors,
        publication,
        setPublication,
        updatePublication,
        killPublication
      }}
    >
      {children}
    </PubliContext.Provider>
  );
};
