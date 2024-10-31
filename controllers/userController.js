// controllers/userController.js
const User = require('../models/user');

const userController = {
  async createUser(req, res) {
    const { nombre, email, contraseña, tipo } = req.body;

    // Solo los administradores pueden crear nuevos usuarios
    if (req.user.tipo !== 'administrador') {
      return res.status(403).send('Acceso denegado');
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const user = await User.create({ nombre, email, contraseña: hashedPassword, tipo });
    res.status(201).json(user);
  },

  async getAllUsers(req, res) {
    // Solo los administradores pueden ver todos los usuarios
    if (req.user.tipo !== 'administrador') {
      return res.status(403).send('Acceso denegado');
    }

    const users = await User.getAll(); // Asegúrate de implementar este método en el modelo
    res.json(users);
  },

  async getUserById(req, res) {
    const { id } = req.params;

    // Solo los administradores pueden ver un usuario específico
    if (req.user.tipo !== 'administrador') {
      return res.status(403).send('Acceso denegado');
    }

    const user = await User.getById(id); // Asegúrate de implementar este método en el modelo
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.json(user);
  }
};

module.exports = userController;
