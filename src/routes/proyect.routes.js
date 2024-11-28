import { Router } from "express";
import { authRequired, authUserJac } from "../middlewares/validateToken.js";
import { createProyect, getProyects, getProyect, createFinishedProyects} from "../controllers/proyect.controller.js";
import { validateSchema } from "../middlewares/validator.schema.js";

const router = Router();
router.post("/proyects", authRequired, authUserJac,  createProyect);
router.post("/proyect-finished", authRequired, authUserJac, createFinishedProyects )
router.get("/proyects",  getProyects);
router.get("/proyect/:id",  getProyect);
export default router;