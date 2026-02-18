const rentalRepository = require('../repositories/rentalRepository');

const getAllRentals = () => rentalRepository.getAllRentals();
const getRentalById = (id) => rentalRepository.getRentalById(id);
const addRental = (data) => rentalRepository.addRental(data);
const updateRental = (id, data) => rentalRepository.updateRental(id, data);
const deleteRental = (id) => rentalRepository.deleteRental(id);

module.exports = { getAllRentals, getRentalById, addRental, updateRental, deleteRental };
