// DbHelper.js

import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

console.log(
  '~~~~DB_HOST',
  DB_HOST,
  '~~~~DB_PORT',
  DB_PORT,
  '~~~~DB_DATABASE',
  DB_DATABASE,
  '~~~~DB_USER',
  DB_USER,
  '~~~~DB_PASSWORD',
  DB_PASSWORD,
);

const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
});

export { pool };
