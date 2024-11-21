import { Router } from "express";
import { authRequired, authUserJac } from "../middlewares/validateToken.js";
import { createComment, getComments } from "../controllers/comment.controller.js";
const router = Router();

router.post("/comments", authRequired, createComment);
router.get("/comments", authRequired, getComments);

export default router;