const express = require('express');
const router = express.Router();

// Tymczasowe dane – udajemy, że to z bazy
const cars = [
  { id: 1, brand: 'Toyota', model: 'Corolla', available: true },
  { id: 2, brand: 'BMW', model: 'X5', available: false },
  { id: 3, brand: 'Tesla', model: 'Model 3', available: true }
];

// GET /api/v1/cars → zwróć wszystkie auta
router.get('/', (req, res) => {
  res.json(cars);
});

module.exports = router;
