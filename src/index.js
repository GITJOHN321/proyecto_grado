import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import rolRoutes from "./routes/rol.routes.js"
import publicationRoutes from "./routes/publi.routes.js"
import commentRoutes from "./routes/comment.routes.js"

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/", authRoutes);
app.use("/api/", rolRoutes);
app.use("/api/", publicationRoutes);
app.use("/api/", commentRoutes);
console.log("server listen on PORT " + process.env.PORT);
app.listen(process.env.PORT);
