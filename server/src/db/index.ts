import mysql from "mysql2/promise";
import { db } from "./../configs/index";

const pool = mysql.createPool({
  ...db,
});

export const query = async (sql: string, values: any[] = []) => {
  return await pool.query(sql, values);
};
