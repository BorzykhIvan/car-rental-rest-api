const brandRepository = require('../repositories/brandRepository');

const getAllBrands = () => brandRepository.getAllBrands();
const getBrandById = (id) => brandRepository.getBrandById(id);

module.exports = { getAllBrands, getBrandById };
