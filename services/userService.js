const userRepository = require('../repositories/userRepository');

const getAllUsers = () => userRepository.getAllUsers();
const getUserById = (id) => userRepository.getUserById(id);
const addUser = (data) => userRepository.addUser(data);
const updateUser = (id, data) => userRepository.updateUser(id, data);
const deleteUser = (id) => userRepository.deleteUser(id);

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
