const pool = require('../config/db');

const Producto = {
  async create({ nombre, cantidad,precio_unitario }) {
    const result = await pool.query(
      `INSERT INTO productos (nombre, cantidad,precio_unitario)
       VALUES ($1, $2,$3) RETURNING *`,
      [nombre, cantidad,precio_unitario]
    );
    return result.rows[0];
  },

  async getAll() {
    const result = await pool.query('SELECT * FROM productos');
    return result.rows;
  },

  async getById(idproducto) {
    const result = await pool.query('SELECT * FROM productos WHERE idproducto = $1', [idproducto]);
    return result.rows[0];
  },

  async update(idproducto, { nombre, cantidad,precio_unitario }) {
    const result = await pool.query(
      `UPDATE productos
       SET nombre = $1, cantidad = $2, precio_unitario = $3
       WHERE idproducto = $4 RETURNING *`,
      [nombre, cantidad,precio_unitario, idproducto]
    );
    return result.rows[0];
  },

  async delete(idproducto) {
    const result = await pool.query('DELETE FROM productos WHERE idproducto = $1', [idproducto]);
    return result.rowCount > 0;
  }
};

module.exports = Producto;
