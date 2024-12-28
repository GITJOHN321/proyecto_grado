import { pool } from "../db.js";

export const addPublication = async (req, res) => {
  const { title, content, public_ } = req.body;
  const { id } = req.user;

  try {
    const [result] = await pool.query(
      "INSERT INTO publications(jac_id,title, content, public) VALUES (?,?,?,?)",
      [id, title, content, public_]
    );

    return res.send({id_publication: result.insertId, title, content, public_, jac_id: id, created_at: new Date().toISOString()});
  } catch (error) {
    return res.status(500).json([error.message]);
  }
}; 

export const getPublicPublications = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT publications.*, user_base.username AS author FROM publications RIGHT JOIN jacs ON publications.jac_id = jacs.user_id JOIN user_base ON jacs.user_id = user_base.user_id WHERE publications.public = TRUE;"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getPublicationsJac = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT publications.*, user_base.username AS author FROM publications RIGHT JOIN jacs ON publications.jac_id = jacs.user_id JOIN user_base ON jacs.user_id = user_base.user_id WHERE publications.public = TRUE AND user_base.user_id = ? ORDER BY publications.created_at DESC",[req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getPublication = async(req, res) =>{
  try {
    const [result] = await pool.query ( "SELECT publications.*, user_base.username AS author FROM publications RIGHT JOIN jacs ON publications.jac_id = jacs.user_id JOIN user_base ON jacs.user_id = user_base.user_id WHERE publications.publication_id = ?",[req.params.id])
    if (!result[0]) return res.status(400).json(["Publication not found"]);
    return res.send(result[0]);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
}

export const getPrivatePublications = async (req, res) => {
  const { id } = req.user;
  try {
    const [jac] = await pool.query(
      "SELECT jac_id FROM roles WHERE user_id = ?",
      [id]
    );

    if (!jac[0]) return res.status(400).json(["Don't have Roles"]);
    const [result] = await pool.query(
      "SELECT publications.*, user_base.username AS author FROM publications RIGHT JOIN jacs ON publications.jac_id = jacs.user_id JOIN user_base ON jacs.user_id = user_base.user_id WHERE publications.public = FALSE AND jacs.user_id = ?",[jac[0].jac_id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const getMyPublications = async (req,res) =>{
  const { id } = req.user;
  try {
    const [result] = await pool.query(
      "SELECT publications.*,  user_base.username AS author FROM publications RIGHT JOIN jacs ON publications.jac_id = jacs.user_id JOIN user_base ON jacs.user_id = user_base.user_id WHERE jacs.user_id = ?;",[id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
}

export const updatePublications = async (req, res) =>{
  const {title, content, public_} = req.body
  try {
    const [result] = await pool.query(
      "UPDATE publications SET title = ?, content = ?, public = ? WHERE publication_id = ?",
      [title, content, public_, req.params.id]
    );
    console.log(result)
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const deletePublications = async (req, res) => {
  try {
    await pool.query("DELETE FROM publications WHERE publication_id= ?",[req.params.id])

    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}