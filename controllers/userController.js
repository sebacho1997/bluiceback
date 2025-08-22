// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
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
    console.log('Obteniendo todos los usuarios...');
    //if (req.user.tipo !== 'administrador') {
    //  return res.status(403).send('Acceso denegado');
    //}

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
  },

async updateUser(req, res) {
  const { id } = req.params;
  const { nombre,telefono, email, password,activado, tipo_usuario } = req.body;
  console.log("tipo Usuario:"+ req.user.tipo_usuario);
  if (req.user.tipo_usuario !== 'administrador') {
    return res.status(403).send('Acceso denegado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const updatedUser = await User.update(id, {
    nombre,
    telefono,
    email,
    password: hashedPassword,
    activado,
    tipo_usuario
  });

  res.json(updatedUser);
},
async getUsersByType(req, res) {
  // Solo administradores pueden usar este filtro
  if (req.user.tipo_usuario !== 'administrador') {
    return res.status(403).send('Acceso denegado');
  }

  const tipo = req.query.tipo; // Leemos ?tipo=valor desde la URL

  if (!tipo) {
    return res.status(400).send('Falta parámetro tipo');
  }

  const users = await User.getByType(tipo);

  res.json(users);
},
async deleteUser(req, res) {
  const { id } = req.params;

  // Solo los administradores pueden eliminar usuarios
  if (req.user.tipo !== 'administrador') {
    return res.status(403).send('Acceso denegado');
  }

  const deleted = await User.deleteById(id);
  if (!deleted) {
    return res.status(404).send('Usuario no encontrado');
  }

  res.send('Usuario eliminado correctamente');
}
};

module.exports = userController;
