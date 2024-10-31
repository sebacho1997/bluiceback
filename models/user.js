// models/User.js
const pool = require('../config/db');

const User = {
  async create(userData) {
    const { nombre, email, contraseña, tipo } = userData;
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, contraseña, tipo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, contraseña, tipo]
    );
    return result.rows[0];
  },

  async getAll() {
    const result = await pool.query('SELECT id, nombre, email, tipo FROM usuarios');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT id, nombre, email, tipo FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  },
};

module.exports = User;
