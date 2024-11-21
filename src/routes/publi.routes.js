import { Router } from "express";
import { authRequired, authUserJac } from "../middlewares/validateToken.js";
import {
  addPublication,
  getPublicPublications,
  getPrivatePublications,
  getMyPublications,
  updatePublications,
  deletePublications,
} from "../controllers/publi.controller.js";
import { validateSchema } from "../middlewares/validator.schema.js";
import { publicationSchema } from "../schemas/publi.schema.js";
const router = Router();

router.post(
  "/publication",
  authRequired,
  authUserJac,
  validateSchema(publicationSchema),
  addPublication
);
router.get("/publication", getPublicPublications);
router.get("/publication-pv", authRequired, getPrivatePublications);
router.get("/publication-my", authRequired, authUserJac, getMyPublications);
router.put(
  "/publication/:id",
  authRequired,
  authUserJac,
  validateSchema(publicationSchema),
  updatePublications
);
router.delete(
  "/publication/:id",
  authRequired,
  authUserJac,
  deletePublications
);
export default router;
