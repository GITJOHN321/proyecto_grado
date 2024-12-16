import { Router } from "express";
import { authRequired, authUserJac } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.schema.js";
import {
  validEmail
} from "../schemas/auth.schema.js";
import { roles_standar, addRole, asingRolUser, deleteRolUser, deleteRol,getRoles, getRolesUser } from "../controllers/role.controller.js";

const router = Router();
router.post("/roles", authRequired, authUserJac,  roles_standar);
router.post("/rol", authRequired, authUserJac,  addRole);
router.post("/rol-user", authRequired, authUserJac, asingRolUser )
router.put("/rol-user",authRequired, authUserJac, deleteRolUser)
router.delete("/rol/:id",authRequired, authUserJac, deleteRol)
router.get("/rol",authRequired, authUserJac, getRoles)
router.get("/rol/:id",authRequired, authUserJac, getRolesUser)
export default router;