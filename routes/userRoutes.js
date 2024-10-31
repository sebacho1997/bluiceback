// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas relacionadas con usuarios
// router.post('/', authMiddleware, userController.createUser); // Crear usuario (solo administradores)
// router.get('/', authMiddleware, userController.getAllUsers); // Obtener todos los usuarios (solo administradores)
// router.get('/:id', authMiddleware, userController.getUserById); // Obtener usuario por ID (solo administradores)
// Temporariamente sin el middleware de autenticación
router.get('/', userController.getAllUsers); // Obtener todos los usuarios (solo administradores)

module.exports = router;
