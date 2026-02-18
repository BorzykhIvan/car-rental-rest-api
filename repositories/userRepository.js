const pool = require('../db');

const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
  return result.rows[0];
};

const addUser = async ({ first_name, last_name, email, phone }) => {
  const result = await pool.query(
    'INSERT INTO users (first_name, last_name, email, phone) VALUES ($1,$2,$3,$4) RETURNING *',
    [first_name, last_name, email, phone]
  );
  return result.rows[0];
};

const updateUser = async (id, { first_name, last_name, email, phone }) => {
  const result = await pool.query(
    `UPDATE users SET first_name=$1, last_name=$2, email=$3, phone=$4
     WHERE id=$5 RETURNING *`,
    [first_name, last_name, email, phone, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
