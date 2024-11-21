import { Router } from "express";
import {
  register,
  login,
  logout,
  changePasswordFromPerfil,
  verifyToken,
  deleteUser,
  register_jac
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.schema.js";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  registerJacSchema
} from "../schemas/auth.schema.js";
const router = Router();
router.post("/register", validateSchema(registerSchema), register);
router.post("/register_jac",validateSchema(registerJacSchema), register_jac);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.post(
  "/change_password",
  authRequired,
  validateSchema(changePasswordSchema),
  changePasswordFromPerfil
);
router.get("/verify", verifyToken);
router.delete("/user", authRequired, deleteUser);
export default router;
