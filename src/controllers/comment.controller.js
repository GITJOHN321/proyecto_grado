import { pool } from "../db.js";
//CREATE-GET-UPDATE-DELETE
export const createComment = async (req,res)=>{
    const {publication_id, content} = req.body
    const {id} = req.user
    try {
         const [result] = await pool.query("INSERT INTO comments(publication_id, user_id, content) VALUES(?,?,?)",[publication_id, id, content])

         res.send(result[0])
    } catch (error) {
        return res.status(500).json([error.message]);
    }
}

export const getComments = async (req, res)=>{
        const {publication_id} = req.body
    try {
        const [result] = await pool.query("SELECT comments.*, user_base.username AS author FROM comments RIGHT JOIN user_base ON comments.user_id = user_base.user_id WHERE comments.publication_id = ?",[publication_id])

        res.send(result)
    } catch (error) {
        return res.status(500).json([error.message]);  
    }
}

