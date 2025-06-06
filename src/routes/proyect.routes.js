import { Router } from "express";
import { authRequired, authUserJac } from "../middlewares/validateToken.js";
import { createProyect, getProyects, getProyect, createFinishedProyects, updateProyect, deleteProyect, getAllProyects, getOneProyect, getMyProyects} from "../controllers/proyect.controller.js";
import { validateSchema } from "../middlewares/validator.schema.js";

const router = Router();
router.post("/proyects", authRequired, authUserJac,  createProyect);
router.post("/proyect-finished", authRequired, authUserJac, createFinishedProyects )
router.get("/proyects",  getAllProyects);
router.get("/my-proyects", authRequired, authUserJac, getMyProyects);
router.get("/proyect/:id",  getOneProyect);
router.put("/proyects/:id" , authRequired, authUserJac,  updateProyect);
router.delete("/proyects/:id", authRequired, authUserJac , deleteProyect);
export default router;