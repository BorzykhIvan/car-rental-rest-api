// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'car_rental',
  password: 'postgres', // jeśli zmieniałeś hasło, wpisz swoje
  port: 5432,
});

module.exports = pool;
