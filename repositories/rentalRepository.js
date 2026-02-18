const pool = require('../db');

const getAllRentals = async () => {
  const result = await pool.query('SELECT * FROM rentals');
  return result.rows;
};

const getRentalById = async (id) => {
  const result = await pool.query('SELECT * FROM rentals WHERE id=$1', [id]);
  return result.rows[0];
};

const addRental = async ({ user_id, car_id, start_date, end_date, total_price, status }) => {
  const result = await pool.query(
    `INSERT INTO rentals (user_id, car_id, start_date, end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [user_id, car_id, start_date, end_date, total_price, status || 'active']
  );
  return result.rows[0];
};

const updateRental = async (id, { user_id, car_id, start_date, end_date, total_price, status }) => {
  const result = await pool.query(
    `UPDATE rentals 
     SET user_id=$1, car_id=$2, start_date=$3, end_date=$4, total_price=$5, status=$6
     WHERE id=$7 RETURNING *`,
    [user_id, car_id, start_date, end_date, total_price, status || 'active', id]
  );
  return result.rows[0];
};

const deleteRental = async (id) => {
  const result = await pool.query('DELETE FROM rentals WHERE id=$1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllRentals,
  getRentalById,
  addRental,
  updateRental,
  deleteRental
};
