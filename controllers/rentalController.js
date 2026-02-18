const rentalService = require('../services/rentalService');

const getAllRentals = async (req, res) => {
  try {
    const rentals = await rentalService.getAllRentals();
    res.status(200).json(rentals);
  } catch (err) {
    console.error('Błąd pobierania wypożyczeń:', err);
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się pobrać listy wypożyczeń'
    });
  }
};

const getRentalById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    // Walidacja ID
    if (isNaN(id) || id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe ID',
        message: 'ID musi być dodatnią liczbą całkowitą'
      });
    }

    const rental = await rentalService.getRentalById(id);
    
    if (!rental) {
      return res.status(404).json({ 
        error: 'Nie znaleziono',
        message: `Wypożyczenie o ID ${id} nie istnieje`
      });
    }
    
    res.status(200).json(rental);
  } catch (err) {
    console.error(`Błąd pobierania wypożyczenia ${req.params.id}:`, err);
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się pobrać wypożyczenia'
    });
  }
};

const addRental = async (req, res) => {
  try {
    const { user_id, car_id, start_date, end_date, total_price, status } = req.body;
    
    // Walidacja wymaganych pól
    if (!user_id || !car_id || !start_date || !end_date || !total_price) {
      return res.status(422).json({ 
        error: 'Brak wymaganych pól',
        message: 'Wymagane pola: user_id, car_id, start_date, end_date, total_price'
      });
    }

    // Walidacja typów danych
    if (isNaN(parseInt(user_id)) || user_id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe user_id',
        message: 'user_id musi być dodatnią liczbą całkowitą'
      });
    }

    if (isNaN(parseInt(car_id)) || car_id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe car_id',
        message: 'car_id musi być dodatnią liczbą całkowitą'
      });
    }

    // Walidacja dat
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(startDate.getTime())) {
      return res.status(422).json({ 
        error: 'Nieprawidłowa data rozpoczęcia',
        message: 'start_date musi być prawidłową datą'
      });
    }

    if (isNaN(endDate.getTime())) {
      return res.status(422).json({ 
        error: 'Nieprawidłowa data zakończenia',
        message: 'end_date musi być prawidłową datą'
      });
    }

    if (startDate < today) {
      return res.status(422).json({ 
        error: 'Nieprawidłowa data rozpoczęcia',
        message: 'Data rozpoczęcia nie może być z przeszłości'
      });
    }

    if (endDate <= startDate) {
      return res.status(422).json({ 
        error: 'Nieprawidłowy okres wypożyczenia',
        message: 'Data zakończenia musi być późniejsza niż data rozpoczęcia'
      });
    }

    // Walidacja ceny
    if (isNaN(parseFloat(total_price)) || total_price <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowa cena',
        message: 'total_price musi być dodatnią liczbą'
      });
    }

    // Walidacja statusu jeśli podany
    const validStatuses = ['pending', 'active', 'completed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(422).json({ 
        error: 'Nieprawidłowy status',
        message: `Status musi być jednym z: ${validStatuses.join(', ')}`
      });
    }

    const rental = await rentalService.addRental({ 
      user_id, 
      car_id, 
      start_date, 
      end_date, 
      total_price, 
      status: status || 'pending' 
    });
    
    res.status(201).json(rental);
  } catch (err) {
    console.error('Błąd dodawania wypożyczenia:', err);
    
    // Obsługa konkretnych błędów z serwisu
    if (err.message?.includes('Car not available')) {
      return res.status(409).json({ 
        error: 'Samochód niedostępny',
        message: 'Samochód jest już zarezerwowany w podanym terminie'
      });
    }
    
    if (err.message?.includes('User not found') || err.message?.includes('foreign key')) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe dane',
        message: 'Podany użytkownik lub samochód nie istnieje'
      });
    }
    
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się dodać wypożyczenia'
    });
  }
};

const updateRental = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    // Walidacja ID
    if (isNaN(id) || id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe ID',
        message: 'ID musi być dodatnią liczbą całkowitą'
      });
    }

    const { user_id, car_id, start_date, end_date, total_price, status } = req.body;

    // Walidacja opcjonalnych pól jeśli są podane
    if (user_id !== undefined && (isNaN(parseInt(user_id)) || user_id <= 0)) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe user_id',
        message: 'user_id musi być dodatnią liczbą całkowitą'
      });
    }

    if (car_id !== undefined && (isNaN(parseInt(car_id)) || car_id <= 0)) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe car_id',
        message: 'car_id musi być dodatnią liczbą całkowitą'
      });
    }

    // Walidacja dat jeśli podane
    if (start_date !== undefined) {
      const startDate = new Date(start_date);
      if (isNaN(startDate.getTime())) {
        return res.status(422).json({ 
          error: 'Nieprawidłowa data rozpoczęcia',
          message: 'start_date musi być prawidłową datą'
        });
      }
    }

    if (end_date !== undefined) {
      const endDate = new Date(end_date);
      if (isNaN(endDate.getTime())) {
        return res.status(422).json({ 
          error: 'Nieprawidłowa data zakończenia',
          message: 'end_date musi być prawidłową datą'
        });
      }
    }

    // Walidacja ceny jeśli podana
    if (total_price !== undefined && (isNaN(parseFloat(total_price)) || total_price <= 0)) {
      return res.status(422).json({ 
        error: 'Nieprawidłowa cena',
        message: 'total_price musi być dodatnią liczbą'
      });
    }

    // Walidacja statusu jeśli podany
    const validStatuses = ['pending', 'active', 'completed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(422).json({ 
        error: 'Nieprawidłowy status',
        message: `Status musi być jednym z: ${validStatuses.join(', ')}`
      });
    }

    const rental = await rentalService.updateRental(id, { 
      user_id, 
      car_id, 
      start_date, 
      end_date, 
      total_price, 
      status 
    });
    
    if (!rental) {
      return res.status(404).json({ 
        error: 'Nie znaleziono',
        message: `Wypożyczenie o ID ${id} nie istnieje`
      });
    }
    
    res.status(200).json(rental);
  } catch (err) {
    console.error(`Błąd aktualizacji wypożyczenia ${req.params.id}:`, err);
    
    if (err.message?.includes('Car not available')) {
      return res.status(409).json({ 
        error: 'Samochód niedostępny',
        message: 'Samochód jest już zarezerwowany w podanym terminie'
      });
    }
    
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się zaktualizować wypożyczenia'
    });
  }
};

const deleteRental = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    // Walidacja ID
    if (isNaN(id) || id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe ID',
        message: 'ID musi być dodatnią liczbą całkowitą'
      });
    }

    const rental = await rentalService.deleteRental(id);
    
    if (!rental) {
      return res.status(404).json({ 
        error: 'Nie znaleziono',
        message: `Wypożyczenie o ID ${id} nie istnieje`
      });
    }
    
    res.status(204).send();
  } catch (err) {
    console.error(`Błąd usuwania wypożyczenia ${req.params.id}:`, err);
    
    if (err.message?.includes('active rental')) {
      return res.status(409).json({ 
        error: 'Konflikt',
        message: 'Nie można usunąć aktywnego wypożyczenia'
      });
    }
    
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się usunąć wypożyczenia'
    });
  }
};

module.exports = { getAllRentals, getRentalById, addRental, updateRental, deleteRental };