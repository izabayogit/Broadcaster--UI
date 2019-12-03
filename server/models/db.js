import { Pool } from 'pg';
import dotenv from 'dotenv';
import 'idempotent-babel-polyfill';


dotenv.config();
class User {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    this.pool.connect()
      .then(() => console.log('connected'))
      .catch((e) => console.log(e));
    this.execute(this.createUserTable);
  }

  createUserTable = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL NOT NULL PRIMARY KEY,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    username VARCHAR(128) NOT NULL,
    phoneNumber VARCHAR(128) NOT NULL
  )`;

  async execute(sql, data = []) {
    const connection = await this.pool.connect();
    try {
      if (data.length) {
        return await connection.query(sql, data);
      }
      return await connection.query(sql);
    } catch (error) {
      return error;
    } finally {
      connection.release();
    }
  }
}
export default new User();