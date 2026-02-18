// repositories/carRepository.js
const pool = require('../db');

const getAllCars = async () => {
  const result = await pool.query(`
    SELECT cars.id, brands.name AS brand, cars.model, cars.year, cars.daily_price, cars.available
    FROM cars
    JOIN brands ON cars.brand_id = brands.id
  `);
  return result.rows;
};

// NOWA FUNKCJA
const addCar = async ({ brand_id, model, year, daily_price, available }) => {
  const result = await pool.query(
    'INSERT INTO cars (brand_id, model, year, daily_price, available) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [brand_id, model, year, daily_price, available]
  );
  return result.rows[0];
};

const updateCar = async (id, { brand_id, model, year, daily_price, available }) => {
  const result = await pool.query(
    `UPDATE cars 
     SET brand_id=$1, model=$2, year=$3, daily_price=$4, available=$5
     WHERE id=$6 RETURNING *`,
    [brand_id, model, year, daily_price, available, id]
  );
  return result.rows[0]; // undefined jeśli brak
};

const deleteCar = async (id) => {
  const result = await pool.query('DELETE FROM cars WHERE id=$1 RETURNING *', [id]);
  return result.rows[0]; // undefined jeśli brak
};

module.exports = {
  getAllCars,
  addCar,
  updateCar,
  deleteCar,
};


