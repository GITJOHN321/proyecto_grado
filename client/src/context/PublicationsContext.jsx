import { createContext, useContext, useEffect, useState } from "react";
import {
  publicationRequest,
  getPublicationsJac,
  getPublicationJac,
  getCommentsUser,
  postComments,
  postPublication,
  putPublication,
  deletePublication,
} from "../api/publication";
import {
  proyectRequest,
  onlyProyectRequest,
  notesRequest,
  getProyects,
  createProyectRequest,
  updateProyectRequest,
  deleteProyectRequest,
  createNoteProyectRequest,
  updateNoteProyectRequest,
  deleteNoteProyectRequest,
} from "../api/proyect.js";
import {
  getMeetingsPublicationJac,
  createMeetJacRequest,
  updateMeetJacRequest,
} from "../api/meetings.js";

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
  const [openFormProject, setOpenFormProject] = useState(false);
  const [openFormNote, setOpenFormNote] = useState(false);
  const [publications, setPublications] = useState([]);
  const [publication, setPublication] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [proyect, setProyect] = useState(null);
  const [notes, setNotes] = useState([]);
  const [meet, setMeet] = useState(null);
  const [note, setNote] = useState(false);

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
  const getMeetingsJac = async (id) => {
    try {
      const res = await getMeetingsPublicationJac(id);
      setMeetings(res.data);
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
  const createMeet = async (user) => {
    try {
      const res = await createMeetJacRequest(user);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const createProyect = async (user) => {
    try {
      const res = await createProyectRequest(user);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const createNoteProyect = async (user) => {
    try {
      const res = await createNoteProyectRequest(user);
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
  const killProyect = async (id) => {
    try {
      const res = await deleteProyectRequest(id);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const killNoteProyect = async (id) => {
    try {
      const res = await deleteNoteProyectRequest(id);
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
  const updateMeet = async (user) => {
    try {
      const res = await updateMeetJacRequest(user);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const updateProyect = async (user) => {
    try {
      const res = await updateProyectRequest(user);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const updateNoteProyect = async (user) => {
    try {
      const res = await updateNoteProyectRequest(user);
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
  const getMyProyect = async (id) => {
    try {
      const res = await getProyects();
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
        killPublication,
        getMyProyect,
        myProjects,
        setMyProjects,
        openFormProject,
        setOpenFormProject,
        proyect,
        setProyect,
        note,
        setNote,
        meet,
        setMeet,
        meetings,
        setMeetings,
        getMeetingsJac,
        createProyect,
        updateProyect,
        killProyect,
        createNoteProyect,
        updateNoteProyect,
        killNoteProyect,
        createMeet,
        updateMeet,
      }}
    >
      {children}
    </PubliContext.Provider>
  );
};
