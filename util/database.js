const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_database",
  password: "724242726",
});

module.exports = pool.promise();