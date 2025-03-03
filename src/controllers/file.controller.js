import { pool } from "../db.js";
import { fileURLToPath } from "url";
import path from "path";

export const saveFile = async (req, res) => {
  const { pathname: root } = new URL("../src", import.meta.url);
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;
  uploadPath =
    "C:/Users/work/Desktop/proyecto_grado/src/" + "/uploads/" + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
};
