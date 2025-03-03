import { pool, conex } from "../db.js";

export const getMeetingsJac = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT publications.*, user_base.username AS author, meetings.* FROM publications RIGHT JOIN jacs ON publications.jac_id = jacs.user_id JOIN user_base ON jacs.user_id = user_base.user_id JOIN meetings ON publications.publication_id = meetings.publication_id WHERE publications.public = TRUE AND user_base.user_id = ? AND publications.type = ? ORDER BY publications.created_at DESC",
      [req.params.id, "meet"]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const createMeetJac = async (req, res) => {
  const { title, content, public_, type, datetime, type_meet, url_meet } =
    req.body;
  const { id } = req.user;
  try {
    await conex.beginTransaction();

    const [result_publication] = await conex.query(
      "INSERT INTO publications(jac_id,title, content, public, type) VALUES (?,?,?,?,?)",
      [id, title, content, public_, type]
    );

    const [result_meetings] = await conex.query(
      "INSERT INTO meetings(publication_id, datetime, type_meet, url_meet) VALUES (?,?,?,?)",
      [result_publication.insertId, datetime, type_meet, url_meet]
    );
    await conex.commit();
    res.json({
      id: result_publication.insertId,
      title,
      content,
      public_,
      type,
      datetime,
      type_meet,
      url_meet,
    });
  } catch (error) {
    await conex.rollback();
    return res.status(500).json([error.message]);
  } finally {
    await conex.release();
  }
};

export const updateMeetJac = async (req, res) => {
  const { title, content, public_, type, datetime, type_meet, url_meet } =
    req.body;
  const { id } = req.user;
  try {
    await conex.beginTransaction();

    const [result_publication] = await conex.query(
      "UPDATE publications SET title = ?, content = ?, public = ? WHERE publication_id = ?",
      [title, content, public_, req.params.id]
    );
    const [result_meetings] = await conex.query(
      "UPDATE meetings SET datetime = ?, type_meet = ?, url_meet = ? WHERE publication_id = ?",
      [datetime, type_meet, url_meet, req.params.id]
    );
    await conex.commit();
    res.json({
      title,
      content,
      public_,
      type,
      datetime,
      type_meet,
      url_meet,
    });
  } catch (error) {
    await conex.rollback();
    return res.status(500).json([error.message]);
  } finally {
    await conex.release();
  }
};

export const deleteMeetJac = async (req, res) => {
  try {
    await conex.beginTransaction();

    const [result_publication] = await conex.query(
      "DELETE FROM publications WHERE publication_id= ?",
      [req.params.id]
    );

    await conex.commit();
    res.sendStatus(204);
  } catch (error) {
    await conex.rollback();
    return res.status(500).json([error.message]);
  } finally {
    await conex.release();
  }
};
