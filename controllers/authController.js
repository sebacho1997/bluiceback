// controllers/authController.js
// Cambiar esta línea en authController.js y otros archivos
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
  async register(req, res) {
    const { nombre, email, contraseña, tipo } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const user = await User.create({ nombre, email, contraseña: hashedPassword, tipo });
    res.status(201).json(user);
  },
  // Agrega el método de inicio de sesión aquí
};

module.exports = authController;
