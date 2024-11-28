import { pool } from "../db.js";
//CREATE, GET, GETS, UPDATE, DELETE
export const createNoteProyect = async (req, res) => {
  const { proyect_id, title, description } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO notes_proyects(proyect_id, title, description) VALUES(?,?,?)",
      [proyect_id, title, description]
    );

    return res.send({ id: result.insertId, proyect_id, title, description });
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};
export const getNotesProyect = async (req, res) => {
  const { proyect_id } = req.body;
  try {
    const [result] = await pool.query(
      "SELECT * FROM notes_proyects WHERE proyect_id = ?",
      [proyect_id]
    );

    return res.send(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getNoteProyect = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM notes_proyects WHERE note_id = ?",
      [req.params.id]
    );

    return res.send(result[0]);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const updateNoteProyect = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE notes_proyects SET ? WHERE note_id = ?",
      [req.params.id]
    );

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const deleteNoteProyect = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM notes_proyects  WHERE note_id = ?",
      [req.params.id]
    );

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};
