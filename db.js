const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "property_tracker",
  password: "yourpassword",
  port: 5432
});

module.exports = pool;
