import { Router } from "express";
import { authRequired, authUserJac } from "../middlewares/validateToken.js";
import {
  getMeetingsJac,
  createMeetJac, updateMeetJac, deleteMeetJac
} from "../controllers/meet.controller.js";
import { validateSchema } from "../middlewares/validator.schema.js";
import { publicationSchema } from "../schemas/publi.schema.js";
const router = Router();

router.get("/meetings/:id", getMeetingsJac);
router.post("/meetings", authRequired, authUserJac, createMeetJac);
router.put("/meetings/:id", authRequired, authUserJac, updateMeetJac);
router.delete("/meetings/:id", authRequired, authUserJac, deleteMeetJac);
export default router;
