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
    this.execute(this.createEntityTable);
    this.admin();
  }
  createUserTable = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL NOT NULL PRIMARY KEY,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    username VARCHAR(128) NOT NULL,
    status  VARCHAR(128) NOT NULL DEFAULT 'USER',
    phoneNumber VARCHAR(128) NOT NULL
  )`;

  createEntityTable = `CREATE TABLE IF NOT EXISTS
  entity(
    id SERIAL NOT NULL PRIMARY KEY,
    createdon VARCHAR(128) NOT NULL,
    createdby VARCHAR(128)  NOT NULL,
    title VARCHAR(128) NOT NULL ,
    type VARCHAR(128) NOT NULL,
    location VARCHAR(128) NOT NULL,
    status VARCHAR(128) NOT NULL,
    productimage VARCHAR(128) NOT NULL,
    videos VARCHAR(128) NOT NULL,
    comment VARCHAR(128) NOT NULL
  )`;

  insertAdmin =`
  INSERT INTO users (id,firstName, lastName, email, password, username, status, phoneNumber)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8)
  `;

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
  admin = async () => {
    try {
      const values = [
        1,
        'jonas',
        'muhire',
        'jonasmuhire@gmail.com',
        'kigalikigali',
        'jonas',
        'admin',
        '0785208449',
      ];
      await this.execute(this.insertAdmin, values);
    } catch (error) {
      console.log(`error ${error}`);
    }
  } 
}
export default new User();
