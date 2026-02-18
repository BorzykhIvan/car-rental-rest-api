const express = require('express');
const app = express();
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const brandRoutes = require('./routes/brandRoutes');
const carFeatureRoutes = require('./routes/carFeatureRoutes');
const setupSwagger = require('./swagger');

app.use(express.json());

app.use('/api/v1/cars', carRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/car-features', carFeatureRoutes);

app.get('/', (req, res) => {
  res.send('Car rental API is running');
});

setupSwagger(app);

module.exports = app;

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on port ${port}`);
  });
}
