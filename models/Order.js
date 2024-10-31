// models/Order.js
const pool = require('../config/db');

const Order = {
  async create(orderData) {
    const { cliente_id, tipo_producto, cantidad, estado, fecha_pedido, fecha_entrega } = orderData;
    const result = await pool.query(
      'INSERT INTO pedidos (cliente_id, tipo_producto, cantidad, estado, fecha_pedido, fecha_entrega) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [cliente_id, tipo_producto, cantidad, estado, fecha_pedido, fecha_entrega]
    );
    return result.rows[0];
  },
  // Puedes agregar más métodos según lo necesites
};

module.exports = Order;
