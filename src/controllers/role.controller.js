import { ROL_STANDAR } from "../config.js";
import { pool } from "../db.js";

export const roles_standar = async (req, res) => {
  const { id } = req.user;

  try {
    for (let i = 0; i < ROL_STANDAR.length; i++) {
      await pool.query("INSERT INTO roles(jac_id, rolname) VALUES (?,?)", [
        id,
        ROL_STANDAR[i],
      ]);
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};
export const addRole = async (req, res) => {
  const { rolname } = req.body;
  const { id } = req.user;

  try {
    const [result] = await pool.query(
      "INSERT INTO roles(jac_id, rolname) VALUES(?,?)",
      [id, rolname]
    );

    res.send({ id_role: result.insertId, rolname, jac_id: id });
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const asingRolUser = async (req, res) => {
  const { dni, rol_id } = req.body;
  const { id } = req.user;
  console.log(rol_id)
  try {
    const [result] = await pool.query(
      "SELECT * FROM users WHERE dni = ?", 
      [dni]
    );
    if (!result[0]) return res.status(400).json(["DNI not found"]);

    const [rolFound] = await pool.query(
      "SELECT * FROM roles WHERE user_id = ?",
      [result[0].user_id]
    );
    if (rolFound[0]) return res.status(400).json(["User have Rol"]);

    const [result2] = await pool.query(
      "UPDATE roles SET user_id = ? WHERE jac_id = ? AND rol_id = ?",
      [result[0].user_id, id, rol_id]
    );
   
    if (result2.affectedRows === 0)
      return res.status(400).json(["Rol don't exist"]);

    console.log(result2);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const deleteRolUser = async (req, res) => {
  const { user_id } = req.body;
  const { id } = req.user;
  try {


    const [rolFound] = await pool.query(
      "SELECT * FROM roles WHERE user_id = ?",
      [user_id]
    );
    if (!rolFound[0]) return res.status(400).json(["User don't have roles"]);

    await pool.query(
      "UPDATE roles SET user_id = NULL WHERE jac_id = ? AND user_id = ?",
      [id, user_id]
    );
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const deleteRol = async (req, res) => {
  const { id } = req.user;
  try {
    const [result] = await pool.query(
      "DELETE FROM roles WHERE rol_id = ? AND jac_id = ?",
      [req.params.id, id]
    );
    if (result.affectedRows === 0)
      return res.status(400).json(["Rol don't found"]);

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getRoles = async (req, res) => {
  const { id } = req.user;
  try {
    const [result] = await pool.query("SELECT * FROM roles WHERE jac_id= ?", [
      id,
    ]);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getRolesUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT roles.* , user_base.username, user_base.email, user_base.status , user_base.telephone, users.user_last_name AS lastname , users.dni From roles JOIN user_base ON user_base.user_id = roles.user_id JOIN users ON users.user_id = user_base.user_id WHERE roles.jac_id = ?",
      [req.params.id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};
