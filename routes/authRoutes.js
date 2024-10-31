// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
// Agrega la ruta de inicio de sesión aquí

module.exports = router;
