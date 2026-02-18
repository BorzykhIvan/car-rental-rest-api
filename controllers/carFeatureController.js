const carFeatureService = require('../services/carFeatureService');

const getAllCarFeatures = async (req, res) => {
  try {
    const features = await carFeatureService.getAllCarFeatures();
    res.status(200).json(features);
  } catch (error) {
    console.error('Błąd pobierania cech samochodów:', error);
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się pobrać listy cech samochodów'
    });
  }
};

const getCarFeatureById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    // Walidacja ID
    if (isNaN(id) || id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe ID',
        message: 'ID musi być dodatnią liczbą całkowitą'
      });
    }

    const feature = await carFeatureService.getCarFeatureById(id);
    
    if (!feature) {
      return res.status(404).json({ 
        error: 'Nie znaleziono',
        message: `Cecha samochodu o ID ${id} nie istnieje`
      });
    }
    
    res.status(200).json(feature);
  } catch (error) {
    console.error(`Błąd pobierania cechy samochodu ${req.params.id}:`, error);
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się pobrać cechy samochodu'
    });
  }
};

module.exports = { getAllCarFeatures, getCarFeatureById };