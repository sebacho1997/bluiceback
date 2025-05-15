// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authController = {
  async register(req, res) {
    const { nombre, email, contraseña, tipo } = req.body;

    // Verifica si el email ya existe en la base de datos
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.status(400).send('El email ya está registrado');
    }

    // Hashea la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crea el nuevo usuario
    const newUser = await User.create({ nombre, email, contraseña: hashedPassword, tipo });
    
    // Enviar una respuesta de éxito
    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  },

  async login(req, res) {
    const { email, contraseña } = req.body;

    // Buscar el usuario por email
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    // Verificar la contraseña
    const match = await bcrypt.compare(contraseña, user.contraseña);
    if (!match) {
      return res.status(401).send('Contraseña incorrecta');
    }

    // Crear JWT
    const token = jwt.sign({ id: user.id, tipo: user.tipo }, 'tu_clave_secreta', { expiresIn: '1h' });

    // Enviar el token
    res.json({ token });
  }
};

module.exports = authController;
