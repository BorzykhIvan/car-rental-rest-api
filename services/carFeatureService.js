const carFeatureRepository = require('../repositories/carFeatureRepository');

const getAllCarFeatures = () => carFeatureRepository.getAllCarFeatures();
const getCarFeatureById = (id) => carFeatureRepository.getCarFeatureById(id);

module.exports = { getAllCarFeatures, getCarFeatureById };
