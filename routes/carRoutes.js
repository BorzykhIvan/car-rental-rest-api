const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - brand_id
 *         - model
 *         - year
 *         - daily_price
 *       properties:
 *         id:
 *           type: integer
 *           description: Unikalny identyfikator samochodu
 *           example: 1
 *         brand_id:
 *           type: integer
 *           description: ID marki samochodu
 *           example: 1
 *         model:
 *           type: string
 *           description: Model samochodu
 *           example: Corolla
 *         year:
 *           type: integer
 *           description: Rok produkcji
 *           example: 2022
 *         daily_price:
 *           type: number
 *           format: float
 *           description: Cena dzierżawy za dzień
 *           example: 150.50
 *         available:
 *           type: boolean
 *           description: Czy samochód jest dostępny
 *           example: true
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
 *   name: Cars
 *   description: Zarządzanie samochodami w wypożyczalni
 */

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Pobierz listę wszystkich samochodów
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Lista samochodów pobrana pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Błąd serwera
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', carController.getAllCars);

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Dodaj nowy samochód
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand_id
 *               - model
 *               - year
 *               - daily_price
 *             properties:
 *               brand_id:
 *                 type: integer
 *                 example: 1
 *               model:
 *                 type: string
 *                 example: Corolla
 *               year:
 *                 type: integer
 *                 example: 2022
 *               daily_price:
 *                 type: number
 *                 example: 150.50
 *               available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Samochód został dodany
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
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
router.post('/', carController.addCar);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Aktualizuj istniejący samochód
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID samochodu do aktualizacji
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_id:
 *                 type: integer
 *                 example: 1
 *               model:
 *                 type: string
 *                 example: Corolla
 *               year:
 *                 type: integer
 *                 example: 2023
 *               daily_price:
 *                 type: number
 *                 example: 160.00
 *               available:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Samochód został zaktualizowany
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Nie znaleziono samochodu
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
router.put('/:id', carController.updateCar);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Usuń samochód
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID samochodu do usunięcia
 *         example: 1
 *     responses:
 *       204:
 *         description: Samochód został usunięty
 *       404:
 *         description: Nie znaleziono samochodu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Konflikt - istnieją powiązane rezerwacje
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
router.delete('/:id', carController.deleteCar);

module.exports = router;