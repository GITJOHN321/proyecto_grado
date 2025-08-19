import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import rolRoutes from "./routes/rol.routes.js";
import publicationRoutes from "./routes/publi.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import proyectRoutes from "./routes/proyect.routes.js";
import meetRoutes from "./routes/meet.routes.js";
import notesProyectRoutes from "./routes/note_proyect.routes.js";
import fileRoutes from "./routes/file.routes.js";


const app = express();
app.use(
  fileUpload({
     useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath:true
  })
);



app.use(cors({
  origin: "https://prueba.yosoydeaquicali.com",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/", authRoutes);
app.use("/api/", rolRoutes);
app.use("/api/", publicationRoutes);
app.use("/api/", commentRoutes);
app.use("/api/", proyectRoutes);
app.use("/api/", notesProyectRoutes);
app.use("/api/", meetRoutes);
app.use("/api/", fileRoutes);
console.log("server listen on PORT " + process.env.PORT);
app.listen(process.env.PORT);
