// services/carService.js
const carRepository = require('../repositories/carRepository');

const getAllCars = async () => {
  return await carRepository.getAllCars();
};

// NOWA FUNKCJA
const addCar = async (carData) => {
  return await carRepository.addCar(carData);
};
const updateCar = async (id, carData) => {
  return await carRepository.updateCar(id, carData);
};

const deleteCar = async (id) => {
  return await carRepository.deleteCar(id);
};

module.exports = {
  getAllCars,
  addCar,
  updateCar,
  deleteCar,
};
