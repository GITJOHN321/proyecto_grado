import { Router } from "express";
import { authRequired, authUserJac } from "../middlewares/validateToken.js";
import {
  createNoteProyect,
  getNoteProyect,
  getNotesProyect,
  updateNoteProyect,
  deleteNoteProyect,
} from "../controllers/note_proyect.controller.js";

const router = Router();

router.post("/notes", authRequired, authUserJac, createNoteProyect);
router.get("/notes", getNotesProyect);
router.get("/notes/:id", getNoteProyect);
router.put("/notes/:id", authRequired, authUserJac, updateNoteProyect);
router.delete("/notes/:id", authRequired, authUserJac, deleteNoteProyect);
export default router;
