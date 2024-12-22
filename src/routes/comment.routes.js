import { Router } from "express";
import { authRequired, authUserJac } from "../middlewares/validateToken.js";
import { createComment, getComments, getComment, updateComment, deleteComment } from "../controllers/comment.controller.js";
const router = Router();

router.post("/comments", authRequired, createComment);
router.get("/comments/:id", getComments);
router.get("/comment/:id", authRequired, getComment);
router.put("/comments/:id", authRequired, updateComment);
router.delete("/comments/:id", authRequired, deleteComment);
export default router;