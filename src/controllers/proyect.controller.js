import { pool } from "../db.js";

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
    if (state !== "finalizado") {
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
export const createFinishedProyects = async (req, res) => {
  const { proyect_id, end_date, final_budget, notes, state } = req.body;
  try {
    if (state !== "finalizado") return res.send(["state dont is finished"]);
    const [state_update] = await pool.query(
      "UPDATE proyects SET state = ? WHERE proyect_id = ?",
      [state, proyect_id]
    );

    if (!state_update) return res.send(["Proyect don't found"]);
    const [result] = await pool.query(
      "INSERT INTO finished_proyects(proyect_id,end_date,final_budget,notes) VALUES(?,?,?,?)",
      [proyect_id, end_date, final_budget, notes]
    );

    return res.json({ proyect_id, end_date, final_budget, notes });
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};
export const getProyect = async (req, res) => {
  const { state } = req.body;
  try {
    const [result] = await pool.query(
      `SELECT proyects.*, user_base.username AS author FROM proyects RIGHT JOIN jacs ON proyects.jac_id = jacs.user_id JOIN user_base ON jacs.user_id = user_base.user_id WHERE proyects.proyect_id = ?`,
      [req.params.id]
    );
    if (state === "finalizado") {
      console.log("proyecto finalizado");
    }
    console.log(result[0].state);
    return res.send(result[0]);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const updateProyect = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE proyects SET ? WHERE proyects_id = ?",
      [req.body, req.params.id]
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const deleteProyect = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM proyects WHERE proyects_id = ?",
      [req.body, req.params.id]
    );
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};
