// models/Order.js
const pool = require('../config/db');

const Pedido = {
  async create({ usuario_id, direccion, latitud, longitud, info_extra, metodo_pago, productos }) {
    try {
      await pool.query('BEGIN');

      const { rows } = await pool.query(
        `INSERT INTO pedidos (usuario_id, direccion, latitud, longitud, info_extra, metodo_pago)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [usuario_id, direccion, latitud, longitud, info_extra, metodo_pago]
      );

      const pedido = rows[0];

      for (const producto of productos) {
        await pool.query(
          `INSERT INTO pedido_productos (pedido_id, producto_id, cantidad)
           VALUES ($1, $2, $3)`,
          [pedido.id, producto.producto_id, producto.cantidad]
        );
      }

      await pool.query('COMMIT');

      return pedido;
    } catch (error) {
      await pool.query('ROLLBACK');
      console.error('Error creando pedido:', error);
      throw new Error('Error creando pedido');
    }
  },
  async getPedidosPorEstado(usuario_id, estado) {
  try {
    const result = await pool.query(
      'SELECT * FROM pedidos WHERE usuario_id = $1 AND estado = $2',
      [usuario_id, estado]
    );
    return result.rows;
  } catch (error) {
    console.error('Error al obtener pedidos por estado:', error);
    throw new Error('No se pudieron obtener los pedidos');
  }
},
async actualizarEstado(pedido_id, estado) {
  try {
    const result = await pool.query(
      'UPDATE pedidos SET estado = $1 WHERE id = $2 RETURNING *',
      [estado, pedido_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    throw new Error('No se pudo actualizar el estado del pedido');
  }
}
  // Otros métodos: listar pedidos, actualizar estado, etc.
};

module.exports = Pedido;
