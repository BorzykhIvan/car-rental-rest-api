const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       required:
 *         - user_id
 *         - car_id
 *         - start_date
 *         - end_date
 *         - total_price
 *       properties:
 *         id:
 *           type: integer
 *           description: Unikalny identyfikator wypożyczenia
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: ID użytkownika
 *           example: 1
 *         car_id:
 *           type: integer
 *           description: ID samochodu
 *           example: 2
 *         start_date:
 *           type: string
 *           format: date
 *           description: Data rozpoczęcia wypożyczenia
 *           example: "2025-10-15"
 *         end_date:
 *           type: string
 *           format: date
 *           description: Data zakończenia wypożyczenia
 *           example: "2025-10-20"
 *         total_price:
 *           type: number
 *           format: float
 *           description: Całkowita cena wypożyczenia
 *           example: 750.00
 *         status:
 *           type: string
 *           enum: [pending, active, completed, cancelled]
 *           description: Status wypożyczenia
 *           example: active
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data utworzenia rekordu
 *           example: "2025-10-10T10:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data ostatniej aktualizacji
 *           example: "2025-10-10T10:00:00Z"
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *         message:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: Zarządzanie wypożyczeniami samochodów
 */

/**
 * @swagger
 * /rentals:
 *   get:
 *     summary: Pobierz listę wszystkich wypożyczeń
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: Lista wypożyczeń pobrana pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rental'
 *       500:
 *         description: Błąd serwera
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', rentalController.getAllRentals);

/**
 * @swagger
 * /rentals/{id}:
 *   get:
 *     summary: Pobierz szczegóły wypożyczenia po ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Numer ID wypożyczenia
 *         example: 1
 *     responses:
 *       200:
 *         description: Wypożyczenie znalezione
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Nie znaleziono wypożyczenia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: Nieprawidłowe dane wejściowe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Błąd serwera
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', rentalController.getRentalById);

/**
 * @swagger
 * /rentals:
 *   post:
 *     summary: Utwórz nowe wypożyczenie
 *     tags: [Rentals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - car_id
 *               - start_date
 *               - end_date
 *               - total_price
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               car_id:
 *                 type: integer
 *                 example: 2
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-15"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-20"
 *               total_price:
 *                 type: number
 *                 format: float
 *                 example: 750.00
 *               status:
 *                 type: string
 *                 enum: [pending, active, completed, cancelled]
 *                 example: pending
 *     responses:
 *       201:
 *         description: Wypożyczenie zostało utworzone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       409:
 *         description: Konflikt - samochód niedostępny
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: Nieprawidłowe dane wejściowe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Błąd serwera
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', rentalController.addRental);

/**
 * @swagger
 * /rentals/{id}:
 *   put:
 *     summary: Aktualizuj istniejące wypożyczenie
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID wypożyczenia do aktualizacji
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               car_id:
 *                 type: integer
 *                 example: 2
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-15"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-20"
 *               total_price:
 *                 type: number
 *                 format: float
 *                 example: 800.00
 *               status:
 *                 type: string
 *                 enum: [pending, active, completed, cancelled]
 *                 example: active
 *     responses:
 *       200:
 *         description: Wypożyczenie zostało zaktualizowane
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Nie znaleziono wypożyczenia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Konflikt - samochód niedostępny
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: Nieprawidłowe dane wejściowe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Błąd serwera
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', rentalController.updateRental);

/**
 * @swagger
 * /rentals/{id}:
 *   delete:
 *     summary: Usuń wypożyczenie
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID wypożyczenia do usunięcia
 *         example: 1
 *     responses:
 *       204:
 *         description: Wypożyczenie zostało usunięte
 *       404:
 *         description: Nie znaleziono wypożyczenia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Konflikt - nie można usunąć aktywnego wypożyczenia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       422:
 *         description: Nieprawidłowe ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Błąd serwera
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', rentalController.deleteRental);

module.exports = router;