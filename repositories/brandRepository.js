const pool = require('../db');

const getAllBrands = async () => {
  const result = await pool.query('SELECT * FROM brands ORDER BY name');
  return result.rows;
};

const getBrandById = async (id) => {
  const result = await pool.query('SELECT * FROM brands WHERE id=$1', [id]);
  return result.rows[0];
};

module.exports = { getAllBrands, getBrandById };
