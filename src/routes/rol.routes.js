import { Router } from "express";
import { authRequired, authUserJac } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.schema.js";
import {
  validEmail
} from "../schemas/auth.schema.js";
import { roles_standar, addRole, asingRolUser, deleteRolUser, deleteRol,getRoles } from "../controllers/role.controller.js";

const router = Router();
router.post("/roles", authRequired, authUserJac,  roles_standar);
router.post("/rol", authRequired, authUserJac,  addRole);
router.post("/rol-user", authRequired, authUserJac,validateSchema(validEmail), asingRolUser )
router.put("/rol-user",authRequired, authUserJac, validateSchema(validEmail), deleteRolUser)
router.delete("/rol/:id",authRequired, authUserJac, deleteRol)
router.get("/rol",authRequired, authUserJac, getRoles)
export default router;