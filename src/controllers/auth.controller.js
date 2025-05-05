import { pool, conex } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verify_table } from "../libs/verifyTable.js";
import { createAccesToken, getTokenData } from "../libs/jwt.js";
import { TYPE_USER, TYPE_JAC } from "../config.js";
import { LIST_ROLES } from "../../client/src/config/config.js";

export const register_jac = async (req, res) => {
  const {
    username,
    email,
    password,
    password2,
    personery,
    telephone,
    commune,
    neighborhood,
  } = req.body;

  try {
    if (password !== password2)
      return res.status(500).json(["passwords do not match"]);

    const password_hash = await bcrypt.hash(password, 10);

    await conex.beginTransaction();

    const [user_base] = await conex.query(
      "INSERT INTO user_base(email, username, password, user_type, telephone) VALUES(?,?,?,?,?)",
      [email, username, password_hash, TYPE_JAC, telephone]
    );

    const [result] = await conex.query(
      "INSERT INTO jacs(user_id, personery, commune, neighborhood) VALUES (?,?,?,?)",
      [user_base.insertId, personery, commune, neighborhood]
    );
    LIST_ROLES.map(async(rolname) => await  conex.query("INSERT INTO roles(jac_id, rolname) VALUES (?,?)",[user_base.insertId, rolname]))
    await conex.commit();
    res.json({
      id: user_base.insertId,
      username,
      email,
      personery,
      telephone,
      commune,
      neighborhood,
    });
  } catch (error) {
    await conex.rollback();
    return res.status(500).json([error.message]);
  } finally {
    await conex.release();
  }
};
export const register = async (req, res) => {
  const {
    email,
    password,
    password2,
    telephone,
    username,
    user_last_name,
    birthdate,
    dni,
  } = req.body;

  try {
    if (password !== password2)
      return res.status(500).json(["passwords do not match"]);

    const password_hash = await bcrypt.hash(password, 10);

    await conex.beginTransaction();

    const [user_base] = await conex.query(
      "INSERT INTO user_base(email,username, password, user_type, telephone) VALUES(?,?,?,?,?)",
      [email, username, password_hash, TYPE_USER, telephone]
    );
    const [result] = await conex.query(
      "INSERT INTO users(user_id, user_last_name, birthdate, dni) VALUES (?,?,?,?)",
      [user_base.insertId, user_last_name, birthdate, dni]
    );

    await conex.commit();
    res.json({
      id: user_base.insertId,
      telephone,
      username,
      user_last_name,
      user_type: TYPE_USER,
      birthdate,
      dni,
    });
  } catch (error) {
    await conex.rollback();
    return res.status(500).json([error.message]);
  } finally {
    await conex.release();
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [userFound] = await pool.query(
      `SELECT * FROM user_base WHERE email = ?`,
      [email]
    );

    if (!userFound[0]) return res.status(400).json(["User not found"]);

    const isMatch = await bcrypt.compare(password, userFound[0].password);

    if (!isMatch) return res.status(400).json(["Incorrect password"]);

    const token = await createAccesToken({
      id: userFound[0].user_id,
      type_user: userFound[0].user_type,
    });
    const jsonSinPassword = JSON.stringify(userFound[0], (key, value) => {
      // Excluye la propiedad "password"
      return key === "password" ? undefined : value;
    });

    res.cookie("token", token{
    httpOnly: true,
    secure: true,               // Solo se envía por HTTPS
    sameSite: 'None',           // Para permitir cross-origin
    maxAge: 24 * 60 * 60 * 1000 // 1 día en ms
  });
    res.send(jsonSinPassword);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(204);
};

export const changePasswordFromPerfil = async (req, res) => {
  try {
    const { old_password, new_password, new_password2 } = req.body;
    const { id, type_user } = req.user;

    if (new_password !== new_password2)
      return res.status(400).json(["new passwords do not match"]);
    if (old_password === new_password2)
      return res.status(400).json(["new password don't same to old_password"]);

    const [userFound] = await pool.query(
      `SELECT * FROM user_base WHERE user_id = ?`,
      [id]
    );

    if (!userFound[0]) return res.status(400).json(["User not found"]);

    const isMatch = await bcrypt.compare(old_password, userFound[0].password);

    if (!isMatch) return res.status(400).json(["Incorrect password"]);

    const passwordHash = await bcrypt.hash(new_password, 10);
    userFound[0].password = passwordHash;
    const [result] = await pool.query(
      `UPDATE user_base SET ? WHERE user_id = ?`,
      [userFound[0], id]
    );
    return res.status(204).json({ message: "password updated successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Check if password is correct" });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const table = verify_table(user.type_user);
    if (!table) return res.status(400).json(["table not found"]);

    const [userFound] = await pool.query(
      `SELECT  ${table}s.* , user_base.* FROM ${table}s JOIN user_base ON ${table}s.user_id = user_base.user_id WHERE ${table}s.user_id = ?`,
      [user.id]
    );

    if (!userFound[0]) return res.status(401).json(["Unauthorized"]);

    const jsonSinPassword = JSON.stringify(userFound[0], (key, value) => {
      // Excluye la propiedad "password"
      return key === "password" ? undefined : value;
    });

    return res.send(jsonSinPassword);
  });
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM user_base WHERE user_id = ?`,
      [req.user.id]
    );
    console.log(result[0]);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getJacs = async (req, res)=>{
  try {
    const [result] = await pool.query ("SELECT jacs.* , user_base.email, user_base.username, user_base.user_type, user_base.telephone FROM jacs JOIN user_base ON jacs.user_id = user_base.user_id")
    return res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getJac = async (req, res)=>{
  try {
    const [result] = await pool.query ("SELECT jacs.* , user_base.email, user_base.username, user_base.user_type, user_base.telephone FROM jacs JOIN user_base ON jacs.user_id = user_base.user_id WHERE jacs.user_id = ?", [req.params.id])
    return res.send(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const updateUser = async (req, res) => {
  const {
    email,
    password,
    password2,
    telephone,
    username,
    user_last_name,
  } = req.body;

  try {
    if (password !== password2)
      return res.status(500).json(["passwords do not match"]);

    const password_hash = await bcrypt.hash(password, 10);

    await conex.beginTransaction();

    const [user_base] = await conex.query(
      "UPDATE proyects SET ? WHERE proyect_id = ?",
      [email, username, password_hash, TYPE_USER, telephone]
    );
    const [result] = await conex.query(
      "INSERT INTO users(user_id, user_last_name, birthdate, dni) VALUES (?,?,?,?)",
      [user_base.insertId, user_last_name, birthdate, dni]
    );

    await conex.commit();
    res.json({
      id: user_base.insertId,
      telephone,
      username,
      user_last_name,
      user_type: TYPE_USER,
      birthdate,
      dni,
    });
  } catch (error) {
    await conex.rollback();
    return res.status(500).json([error.message]);
  } finally {
    await conex.release();
  }
};
