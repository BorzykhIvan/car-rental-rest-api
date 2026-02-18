const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: Unikalny identyfikator użytkownika
 *           example: 1
 *         name:
 *           type: string
 *           description: Imię i nazwisko użytkownika
 *           example: Jan Kowalski
 *         email:
 *           type: string
 *           format: email
 *           description: Adres email użytkownika
 *           example: jan.kowalski@example.com
 *         phone:
 *           type: string
 *           nullable: true
 *           description: Numer telefonu użytkownika
 *           example: "123456789"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data utworzenia konta
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
 *   name: Users
 *   description: Zarządzanie użytkownikami systemu
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Pobierz listę wszystkich użytkowników
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista użytkowników pobrana pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Błąd serwera
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Pobierz szczegóły użytkownika po ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Numer ID użytkownika
 *         example: 1
 *     responses:
 *       200:
 *         description: Użytkownik znaleziony
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Nie znaleziono użytkownika
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
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Utwórz nowego użytkownika
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Jan Kowalski
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jan.kowalski@example.com
 *               phone:
 *                 type: string
 *                 maxLength: 20
 *                 example: "123456789"
 *     responses:
 *       201:
 *         description: Użytkownik został utworzony
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: Konflikt - email już istnieje
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
router.post('/', userController.addUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Aktualizuj istniejącego użytkownika
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID użytkownika do aktualizacji
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: Jan Nowak
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jan.nowak@example.com
 *               phone:
 *                 type: string
 *                 maxLength: 20
 *                 example: "987654321"
 *     responses:
 *       200:
 *         description: Użytkownik został zaktualizowany
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Nie znaleziono użytkownika
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Konflikt - email już istnieje
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
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Usuń użytkownika
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID użytkownika do usunięcia
 *         example: 1
 *     responses:
 *       204:
 *         description: Użytkownik został usunięty
 *       404:
 *         description: Nie znaleziono użytkownika
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Konflikt - istnieją powiązane wypożyczenia
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
router.delete('/:id', userController.deleteUser);

module.exports = router;