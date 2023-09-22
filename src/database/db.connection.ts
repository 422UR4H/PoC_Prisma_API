import pg, { ClientConfig } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const configDB: ClientConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? true : false,
};
export const clientDB = new Pool(configDB);