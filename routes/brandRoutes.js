const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Unikalny identyfikator marki
 *           example: 1
 *         name:
 *           type: string
 *           description: Nazwa marki
 *           example: Toyota
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
 *   name: Brands
 *   description: Zarządzanie markami samochodów
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Pobierz listę wszystkich marek
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Lista marek pobrana pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       500:
 *         description: Błąd serwera
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', brandController.getAllBrands);

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Pobierz szczegóły marki po ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Numer ID marki
 *         example: 1
 *     responses:
 *       200:
 *         description: Marka znaleziona
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Nie znaleziono marki
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
router.get('/:id', brandController.getBrandById);

module.exports = router;