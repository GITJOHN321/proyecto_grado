import { createPool } from "mysql2/promise";

//createPool es un metodo que obtiene un objeto
export const pool = createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "proyect_db",
  waitForConnections: true,
  connectionLimit: 10,
});

export let conex = await pool.getConnection()