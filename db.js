// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // берем URL из переменных Railway
  ssl: { rejectUnauthorized: false },        // обязательно для облачного Postgres
});

module.exports = pool;
