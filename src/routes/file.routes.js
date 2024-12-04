import { Router } from "express";
import { saveFile } from "../controllers/file.controller.js";
const router = Router();

router.get("/files", saveFile);

export default router;