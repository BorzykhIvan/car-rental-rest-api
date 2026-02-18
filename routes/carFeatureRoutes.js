const express = require('express');
const router = express.Router();
const carFeatureController = require('../controllers/carFeatureController');

/**
 * @swagger
 * components:
 *   schemas:
 *     CarFeature:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: Unikalny identyfikator cechy
 *           example: 1
 *         name:
 *           type: string
 *           description: Nazwa cechy
 *           example: Klimatyzacja
 *         description:
 *           type: string
 *           description: Opis cechy
 *           example: Automatyczna klimatyzacja dwustrefowa
 *         icon_url:
 *           type: string
 *           description: URL ikony cechy (opcjonalne)
 *           example: https://example.com/icons/ac.png
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
 *   name: CarFeatures
 *   description: Zarządzanie cechami i wyposażeniem samochodów
 */

/**
 * @swagger
 * /car-features:
 *   get:
 *     summary: Pobierz listę wszystkich cech samochodów
 *     tags: [CarFeatures]
 *     responses:
 *       200:
 *         description: Lista cech samochodów pobrana pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CarFeature'
 *       500:
 *         description: Błąd serwera
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', carFeatureController.getAllCarFeatures);

/**
 * @swagger
 * /car-features/{id}:
 *   get:
 *     summary: Pobierz szczegóły cechy samochodu po ID
 *     tags: [CarFeatures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Numer ID cechy samochodu
 *         example: 1
 *     responses:
 *       200:
 *         description: Cecha samochodu znaleziona
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarFeature'
 *       404:
 *         description: Nie znaleziono cechy samochodu
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
router.get('/:id', carFeatureController.getCarFeatureById);

module.exports = router;