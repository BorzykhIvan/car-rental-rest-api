-- Tworzymy bazę danych
CREATE DATABASE car_rental;

\c car_rental;

-- Tabela użytkowników (klienci)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela marek samochodów
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Tabela samochodów
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    brand_id INT REFERENCES brands(id) ON DELETE CASCADE,
    model VARCHAR(50) NOT NULL,
    year INT CHECK (year >= 1980),
    daily_price NUMERIC(10,2) CHECK (daily_price > 0),
    available BOOLEAN DEFAULT true
);

-- Tabela cech samochodów (np. automat, klima)
CREATE TABLE car_features (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Tabela łącząca samochody z cechami (N:M)
CREATE TABLE car_features_link (
    car_id INT REFERENCES cars(id) ON DELETE CASCADE,
    feature_id INT REFERENCES car_features(id) ON DELETE CASCADE,
    PRIMARY KEY (car_id, feature_id)
);

-- Tabela wypożyczeń
CREATE TABLE rentals (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    car_id INT REFERENCES cars(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price NUMERIC(10,2) CHECK (total_price >= 0),
    status VARCHAR(20) DEFAULT 'active',
    CHECK (end_date >= start_date)
);

-- Indeksy dla szybkości
CREATE INDEX idx_rentals_user ON rentals(user_id);
CREATE INDEX idx_rentals_car ON rentals(car_id);
CREATE INDEX idx_cars_brand ON cars(brand_id);
