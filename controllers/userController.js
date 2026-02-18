const pool = require('../db');

// Pobierz wszystkich użytkowników
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Błąd pobierania użytkowników:', err);
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się pobrać listy użytkowników'
    });
  }
};

// Pobierz użytkownika po ID
exports.getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    // Walidacja ID
    if (isNaN(id) || id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe ID',
        message: 'ID musi być dodatnią liczbą całkowitą'
      });
    }

    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'Nie znaleziono',
        message: `Użytkownik o ID ${id} nie istnieje`
      });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(`Błąd pobierania użytkownika ${req.params.id}:`, err);
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się pobrać użytkownika'
    });
  }
};

// Dodaj nowego użytkownika
exports.addUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    // Walidacja wymaganych pól
    if (!name || !email) {
      return res.status(422).json({ 
        error: 'Brak wymaganych pól',
        message: 'Wymagane pola: name, email'
      });
    }

    // Walidacja emaila
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(422).json({ 
        error: 'Nieprawidłowy email',
        message: 'Podaj prawidłowy adres email'
      });
    }

    // Walidacja długości pól
    if (name.length < 2 || name.length > 100) {
      return res.status(422).json({ 
        error: 'Nieprawidłowa długość nazwy',
        message: 'Imię i nazwisko musi mieć od 2 do 100 znaków'
      });
    }

    if (phone && phone.length > 20) {
      return res.status(422).json({ 
        error: 'Nieprawidłowy numer telefonu',
        message: 'Numer telefonu nie może przekraczać 20 znaków'
      });
    }

    const result = await pool.query(
      'INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [name.trim(), email.trim().toLowerCase(), phone ? phone.trim() : null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Błąd dodawania użytkownika:', err);
    
    if (err.code === '23505') { // unique violation
      return res.status(409).json({ 
        error: 'Email już istnieje',
        message: 'Użytkownik z tym adresem email już istnieje'
      });
    }
    
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się dodać użytkownika'
    });
  }
};

// Aktualizuj użytkownika
exports.updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    // Walidacja ID
    if (isNaN(id) || id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe ID',
        message: 'ID musi być dodatnią liczbą całkowitą'
      });
    }

    const { name, email, phone } = req.body;

    // Sprawdzenie czy przynajmniej jedno pole do aktualizacji jest podane
    if (!name && !email && !phone) {
      return res.status(422).json({ 
        error: 'Brak danych do aktualizacji',
        message: 'Podaj przynajmniej jedno pole do aktualizacji: name, email lub phone'
      });
    }

    // Walidacja emaila jeśli podany
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(422).json({ 
          error: 'Nieprawidłowy email',
          message: 'Podaj prawidłowy adres email'
        });
      }
    }

    // Walidacja długości pól
    if (name && (name.length < 2 || name.length > 100)) {
      return res.status(422).json({ 
        error: 'Nieprawidłowa długość nazwy',
        message: 'Imię i nazwisko musi mieć od 2 do 100 znaków'
      });
    }

    if (phone && phone.length > 20) {
      return res.status(422).json({ 
        error: 'Nieprawidłowy numer telefonu',
        message: 'Numer telefonu nie może przekraczać 20 znaków'
      });
    }

    // Budowanie dynamicznego zapytania SQL
    const updateFields = [];
    const queryParams = [];
    let paramIndex = 1;

    if (name) {
      updateFields.push(`name = $${paramIndex}`);
      queryParams.push(name.trim());
      paramIndex++;
    }

    if (email) {
      updateFields.push(`email = $${paramIndex}`);
      queryParams.push(email.trim().toLowerCase());
      paramIndex++;
    }

    if (phone !== undefined) {
      updateFields.push(`phone = $${paramIndex}`);
      queryParams.push(phone ? phone.trim() : null);
      paramIndex++;
    }

    queryParams.push(id);

    const query = `UPDATE users SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramIndex} RETURNING *`;
    
    const result = await pool.query(query, queryParams);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'Nie znaleziono',
        message: `Użytkownik o ID ${id} nie istnieje`
      });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(`Błąd aktualizacji użytkownika ${req.params.id}:`, err);
    
    if (err.code === '23505') {
      return res.status(409).json({ 
        error: 'Email już istnieje',
        message: 'Użytkownik z tym adresem email już istnieje'
      });
    }
    
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się zaktualizować użytkownika'
    });
  }
};

// Usuń użytkownika
exports.deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    // Walidacja ID
    if (isNaN(id) || id <= 0) {
      return res.status(422).json({ 
        error: 'Nieprawidłowe ID',
        message: 'ID musi być dodatnią liczbą całkowitą'
      });
    }

    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'Nie znaleziono',
        message: `Użytkownik o ID ${id} nie istnieje`
      });
    }
    
    res.status(204).send();
  } catch (err) {
    console.error(`Błąd usuwania użytkownika ${req.params.id}:`, err);
    
    if (err.code === '23503') { // foreign key violation
      return res.status(409).json({ 
        error: 'Konflikt',
        message: 'Nie można usunąć użytkownika - istnieją powiązane wypożyczenia'
      });
    }
    
    res.status(500).json({ 
      error: 'Wewnętrzny błąd serwera',
      message: 'Nie udało się usunąć użytkownika'
    });
  }
};