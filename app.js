const express = require('express');
const app = express();
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const brandRoutes = require('./routes/brandRoutes');
const carFeatureRoutes = require('./routes/carFeatureRoutes');
const setupSwagger = require('./swagger');

app.use(express.json());

// wersjonowanie API
app.use('/api/v1/cars', carRoutes);

app.use('/api/v1/users', userRoutes);

app.use('/api/v1/rentals', rentalRoutes);

app.use('/api/v1/brands', brandRoutes);

app.use('/api/v1/car-features', carFeatureRoutes);

// endpoint testowy
app.get('/', (req, res) => {
  res.send('Wypożyczalnia samochodów działa z warstwami N-tier! 🚗');
});

// Swagger
setupSwagger(app);

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('Serwer wypożyczalni uruchomiony na porcie 3000 🚘'));
}
