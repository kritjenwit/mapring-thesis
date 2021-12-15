import type { PoolOptions } from "mysql2";
import { environment } from "./environment";

export const db = {
  host: environment.DB_HOST,
  user: environment.DB_USER,
  password: environment.DB_PASS,
  database: environment.DB_NAME,
  port: environment.DB_PORT,
} as PoolOptions;
