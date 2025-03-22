import { createPool } from "mysql2/promise";

//createPool es un metodo que obtiene un objeto
export const pool = createPool({
  host: "prueba.yosoydeaquicali.com",
  port: 3306,
  user: "johnseba_proyect",
  password: "Xuper2013*",
  database: "johnseba_proyect_db",
  waitForConnections: true,
  connectionLimit: 10,
});

export let conex = await pool.getConnection()
