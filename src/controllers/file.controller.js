import { pool } from "../db.js";
export const saveFile = async (req, res) => {
  return await res.download("https://play.google.com/store/apps/details?id=an.SpanishTranslate&hl=es_US")
};