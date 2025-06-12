import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "banco_teste",
});

export default db;