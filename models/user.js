// models/User.js
const pool = require('../config/db');

const User = {
  async getByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
      return result.rows[0]; // Devuelve el primer usuario encontrado
    } catch (error) {
      console.error('Error al obtener usuario por email:', error);
      throw new Error('No se pudo obtener el usuario');
    }
  },

  async create(userData) {
    const { nombre, email, contraseña, tipo } = userData;
    try {
      const result = await pool.query(
        'INSERT INTO usuarios (nombre, email, contraseña, tipo) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, email, contraseña, tipo]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw new Error('No se pudo crear el usuario');
    }
  },

  async update(id, userData) {
    const { nombre, email, contraseña, tipo } = userData;
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, email = $2, contraseña = $3, tipo = $4 WHERE id = $5 RETURNING id, nombre, email, tipo',
      [nombre, email, contraseña, tipo, id]
    );
    return result.rows[0];
  },

  async getAll() {
    try {
      const result = await pool.query('SELECT id, nombre, email, tipo FROM usuarios');
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      throw new Error('No se pudieron obtener los usuarios');
    }
  },

  async getById(id) {
    try {
      const result = await pool.query('SELECT id, nombre, email, tipo FROM usuarios WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      throw new Error('No se pudo obtener el usuario');
    }
  },
  async getByType(tipo) {
  const result = await pool.query(
    'SELECT id, nombre, email, tipo FROM usuarios WHERE tipo = $1',
    [tipo]
  );
  return result.rows;
},
  async deleteById(id) {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    return result.rowCount > 0; // true si se eliminó algo
  }
};

module.exports = User;
