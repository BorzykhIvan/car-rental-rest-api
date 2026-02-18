// controllers/carController.js
const carService = require('../services/carService');

const getAllCars = async (req, res) => {
  try {
    const cars = await carService.getAllCars();
    res.status(200).json(cars);
  } catch (err) {
    console.error('Błąd pobierania samochodów:', err);
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się pobrać listy samochodów'
    });
  }
};

// Dodawanie nowego samochodu
const addCar = async (req, res) => {
  try {
    const { brand_id, model, year, daily_price, available } = req.body;
    
    // Walidacja wymaganych pól
    if (!brand_id || !model || !year || !daily_price) {
      return res.status(422).json({ 
        error: 'Brak wymaganych pól',
        message: 'Wymagane pola: brand_id, model, year, daily_price'
      });
    }

    // Walidacja typów danych
    if (isNaN(parseInt(brand_id)) || brand_id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe brand_id',
        message: 'brand_id musi być dodatnią liczbą całkowitą'
      });
    }

    if (isNaN(parseInt(year)) || year < 1900 || year > new Date().getFullYear() + 1) {
      return res.status(422).json({ 
        error: 'Nieprawidłowy rok',
        message: `Rok musi być liczbą pomiędzy 1900 a ${new Date().getFullYear() + 1}`
      });
    }

    if (isNaN(parseFloat(daily_price)) || daily_price <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowa cena',
        message: 'daily_price musi być dodatnią liczbą'
      });
    }

    const newCar = await carService.addCar({ 
      brand_id, 
      model, 
      year, 
      daily_price, 
      available: available !== undefined ? available : true 
    });
    
    res.status(201).json(newCar);
  } catch (err) {
    console.error('Błąd dodawania samochodu:', err);
    
    if (err.message?.includes('foreign key')) {
      return res.status(422).json({ 
        error: 'Nieprawidłowa marka',
        message: 'Podana marka (brand_id) nie istnieje'
      });
    }
    
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się dodać samochodu'
    });
  }
};

// Aktualizacja auta
const updateCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    // Walidacja ID
    if (isNaN(id) || id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe ID',
        message: 'ID musi być dodatnią liczbą całkowitą'
      });
    }

    const { brand_id, model, year, daily_price, available } = req.body;

    // Walidacja opcjonalnych pól jeśli są podane
    if (brand_id !== undefined && (isNaN(parseInt(brand_id)) || brand_id <= 0)) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe brand_id',
        message: 'brand_id musi być dodatnią liczbą całkowitą'
      });
    }

    if (year !== undefined && (isNaN(parseInt(year)) || year < 1900 || year > new Date().getFullYear() + 1)) {
      return res.status(422).json({ 
        error: 'Nieprawidłowy rok',
        message: `Rok musi być liczbą pomiędzy 1900 a ${new Date().getFullYear() + 1}`
      });
    }

    if (daily_price !== undefined && (isNaN(parseFloat(daily_price)) || daily_price <= 0)) {
      return res.status(422).json({ 
        error: 'Nieprawidłowa cena',
        message: 'daily_price musi być dodatnią liczbą'
      });
    }

    const updatedCar = await carService.updateCar(id, { brand_id, model, year, daily_price, available });
    
    if (!updatedCar) {
      return res.status(404).json({ 
        error: 'Nie znaleziono',
        message: `Samochód o ID ${id} nie istnieje`
      });
    }
    
    res.status(200).json(updatedCar);
  } catch (err) {
    console.error(`Błąd aktualizacji samochodu ${req.params.id}:`, err);
    
    if (err.message?.includes('foreign key')) {
      return res.status(422).json({ 
        error: 'Nieprawidłowa marka',
        message: 'Podana marka (brand_id) nie istnieje'
      });
    }
    
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się zaktualizować samochodu'
    });
  }
};

// Usuwanie auta
const deleteCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    // Walidacja ID
    if (isNaN(id) || id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe ID',
        message: 'ID musi być dodatnią liczbą całkowitą'
      });
    }

    const deleted = await carService.deleteCar(id);
    
    if (!deleted) {
      return res.status(404).json({ 
        error: 'Nie znaleziono',
        message: `Samochód o ID ${id} nie istnieje`
      });
    }
    
    res.status(204).send();
  } catch (err) {
    console.error(`Błąd usuwania samochodu ${req.params.id}:`, err);
    
    if (err.message?.includes('foreign key constraint')) {
      return res.status(409).json({ 
        error: 'Konflikt',
        message: 'Nie można usunąć samochodu - istnieją powiązane rezerwacje'
      });
    }
    
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się usunąć samochodu'
    });
  }
};

module.exports = {
  getAllCars,
  addCar,
  updateCar,
  deleteCar,
};