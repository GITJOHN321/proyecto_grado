import { pool } from "../db.js";
import { FINISHED_STATE } from "../config.js";
//CREATE-GET-GETS-UPDATE-DELETE

export const createProyect = async (req, res) => {
  const {
    name_proyect,
    location,
    description,
    object,
    state,
    initial_budget,
    stimated_time,
    start_date,
  } = req.body;
  const { id } = req.user;

  try {
    if (state === FINISHED_STATE)
      return res.send(["No puedes crear un proyecto finalizado"]);
    const [result] = await pool.query(
      "INSERT INTO proyects(jac_id,name_proyect, location, description, object, state, initial_budget, stimated_time, start_date) VALUES (?,?,?,?,?,?,?,?,?) ",
      [
        id,
        name_proyect,
        location,
        description,
        object,
        state,
        initial_budget,
        stimated_time,
        start_date,
      ]
    );

    return res.json({
      proyect_id: result.insertId,
      name_proyect,
      location,
      description,
      object,
      state,
      initial_budget,
      stimated_time,
      start_date,
    });
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getProyects = async (req, res) => {
  const { state, jac_id } = req.body; 
  try {
    if (state !== FINISHED_STATE) {
      const [result] = await pool.query(
        `SELECT proyects.*, user_base.username AS author FROM proyects RIGHT JOIN jacs ON proyects.jac_id = jacs.user_id JOIN user_base ON jacs.user_id = user_base.user_id WHERE proyects.jac_id = ? AND proyects.state = "${state}"`,
        [jac_id]
      );
      return res.send(result);
    } else {
      const [result] = await pool.query(
        "SELECT proyects.*, user_base.username AS author, finished_proyects.* FROM proyects RIGHT JOIN jacs ON proyects.jac_id = jacs.user_id JOIN user_base ON jacs.user_id = user_base.user_id JOIN finished_proyects ON finished_proyects.proyect_id = proyects.proyect_id WHERE proyects.jac_id = ? ",
        [jac_id]
      );
      return res.send(result);
    }
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getAllProyects = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT proyects.* , user_base.username AS author, jacs.neighborhood AS neighborhood FROM proyects JOIN user_base ON user_base.user_id = proyects.jac_id JOIN jacs ON user_base.user_id = jacs.user_id;"
    );
    return res.send(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getMyProyects = async (req, res) => {
  const {id} = req.user
  try {
    const [result] = await pool.query(
      "SELECT proyects.* , user_base.username AS author, jacs.neighborhood AS neighborhood FROM proyects JOIN user_base ON user_base.user_id = proyects.jac_id JOIN jacs ON user_base.user_id = jacs.user_id WHERE user_base.user_id = ?",[id]
    );
    return res.send(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getOneProyect = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT proyects.* , user_base.username AS author FROM proyects JOIN user_base ON user_base.user_id = proyects.jac_id WHERE proyects.proyect_id = ? ",[req.params.id]
    );
    if (!result[0]) return res.status(400).json(["Proyect not found"]);
    return res.send(result[0]);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};
export const getProyect = async (req, res) => {
  const { state, proyect_id } = req.body;
  try {
    if (state !== FINISHED_STATE) {
      const [result] = await pool.query(
        `SELECT proyects.*, user_base.username AS author FROM proyects RIGHT JOIN jacs ON proyects.jac_id = jacs.user_id JOIN user_base ON jacs.user_id = user_base.user_id WHERE proyects.proyect_id = ? `,
        [proyect_id]
      );
      return res.send(result);
    } else {
      const [result] = await pool.query(
        "SELECT proyects.*, user_base.username AS author, finished_proyects.* FROM proyects RIGHT JOIN jacs ON proyects.jac_id = jacs.user_id JOIN user_base ON jacs.user_id = user_base.user_id JOIN finished_proyects ON finished_proyects.proyect_id = proyects.proyect_id WHERE proyects.proyect_id = ? ",
        [proyect_id]
      );
      return res.send(result);
    }
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const updateProyect = async (req, res) => {
  const {description, initial_budget, location, name_proyect, object, start_date, state, stimated_time } = req.body
  const newProyect = {description, initial_budget, location, name_proyect, object, start_date, state:"propuesta", stimated_time}
  try {
    const [result] = await pool.query(
      "UPDATE proyects SET ? WHERE proyect_id = ?",
      [newProyect, req.params.id]
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const deleteProyect = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM proyects WHERE proyect_id = ?",
      [req.params.id]
    );

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};
export const createFinishedProyects = async (req, res) => {
  const { proyect_id, end_date, final_budget, notes, state } = req.body;
  try {
    if (state !== FINISHED_STATE) return res.send(["state dont is finished"]);
    const [state_update] = await pool.query(
      "UPDATE proyects SET state = ? WHERE proyect_id = ?",
      [state, proyect_id]
    );

    if (!state_update) return res.send(["Proyect don't found"]);
    const [result] = await pool.query(
      "INSERT INTO finished_proyects(proyect_id,end_date,final_budget,notes) VALUES(?,?,?,?)",
      [proyect_id, end_date, final_budget, notes]
    );

    return res.json({ proyect_id, end_date, final_budget, notes, state });
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const updateFinishedProyect = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE finished_proyects SET ? WHERE proyect_id = ?",
      [req.body, req.params.id]
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const deleteFinishedProyect = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM finished_proyects WHERE proyect_id = ?",
      [req.params.id]
    );
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};
