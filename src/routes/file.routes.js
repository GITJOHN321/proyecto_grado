import { Router } from "express";
import { saveFile } from "../controllers/file.controller.js";
const router = Router();

router.post("/files", saveFile);

export default router;