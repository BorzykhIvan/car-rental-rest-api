const brandService = require('../services/brandService');

// Pobierz wszystkie marki
const getAllBrands = async (req, res) => {
  try {
    const brands = await brandService.getAllBrands();
    res.status(200).json(brands);
  } catch (error) {
    console.error('Błąd pobierania marek:', error);
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się pobrać listy marek'
    });
  }
};

// Pobierz markę po ID
const getBrandById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe ID',
        message: 'ID musi być dodatnią liczbą całkowitą'
      });
    }

    const brand = await brandService.getBrandById(id);
    if (!brand) {
      return res.status(404).json({ 
        error: 'Nie znaleziono',
        message: `Marka o ID ${id} nie istnieje`
      });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error(`Błąd pobierania marki ${req.params.id}:`, error);
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się pobrać marki'
    });
  }
};

module.exports = { getAllBrands, getBrandById };