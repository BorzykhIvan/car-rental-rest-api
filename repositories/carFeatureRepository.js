const pool = require('../db');

const getAllCarFeatures = async () => {
  const result = await pool.query('SELECT * FROM car_features ORDER BY name');
  return result.rows;
};

const getCarFeatureById = async (id) => {
  const result = await pool.query('SELECT * FROM car_features WHERE id=$1', [id]);
  return result.rows[0];
};

module.exports = { getAllCarFeatures, getCarFeatureById };
