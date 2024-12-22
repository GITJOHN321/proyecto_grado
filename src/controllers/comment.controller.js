import { pool } from "../db.js";
//CREATE-GET-UPDATE-DELETE
export const createComment = async (req, res) => {
  const { publication_id, content } = req.body;
  const { id } = req.user;
  try {
    const [result] = await pool.query(
      "INSERT INTO comments(publication_id, user_id, content) VALUES(?,?,?)",
      [publication_id, id, content]
    );

    return res.send({ id: result.insertId, publication_id, content });
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getComments = async (req, res) => {
 
  try {
    const [result] = await pool.query(
      "SELECT comments.*, user_base.username AS author FROM comments JOIN user_base ON comments.user_id = user_base.user_id WHERE comments.status = TRUE AND comments.publication_id = ?",
      [req.params.id]
    );

    return res.send(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getComment = async (req, res) => {
  const { publication_id } = req.body;
  try {
    const [result] = await pool.query(
      "SELECT comments.*, user_base.username AS author FROM comments RIGHT JOIN user_base ON comments.user_id = user_base.user_id WHERE comments.publication_id = ? AND comments.status = TRUE AND comments.comment_id = ?",
      [publication_id, req.params.id]
    );
    return res.send(result[0]);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const updateComment = async (req, res) => {
  const { content } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE comments SET content = ? WHERE comment_id = ?",
      [content, req.params.id]
    );
    return res.json({ content });
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM comments WHERE comment_id = ?",
      [req.params.id]
    );
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};
