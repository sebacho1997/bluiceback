// models/Pedido.js
const pool = require('../config/db');

const Pedido = {
  async create(pedidoData) {
    const {
      usuario_id,
      direccion_id, // opcional
      direccion,
      latitud,
      longitud,
      info_extra,
      metodo_pago,
      productos
    } = pedidoData;

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Insertar el pedido
      const result = await client.query(
        `INSERT INTO pedidos (usuario_id, direccion_id, direccion, latitud, longitud, info_extra, metodo_pago, estado)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'pendiente')
         RETURNING *`,
        [usuario_id, direccion_id || null, direccion || null, latitud || null, longitud || null, info_extra || null, metodo_pago]
      );

      const pedido = result.rows[0];

      // Insertar productos del pedido
      for (const prod of productos) {
        await client.query(
          `INSERT INTO pedido_productos (pedido_id, producto_id, cantidad)
           VALUES ($1, $2, $3)`,
          [pedido.id, prod.producto_id, prod.cantidad]
        );
      }

      await client.query('COMMIT');
      return pedido;

    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error al crear pedido:', error);
      throw new Error('No se pudo crear el pedido');
    } finally {
      client.release();
    }
  },

  async getByEstadoYCliente(usuario_id, estado) {
    try {
      const result = await pool.query(
        `SELECT * FROM pedidos
         WHERE usuario_id = $1 AND estado = $2
         ORDER BY id DESC`,
        [usuario_id, estado]
      );
      return result.rows;
    } catch (error) {
      console.error('Error al obtener pedidos por estado:', error);
      throw new Error('No se pudo obtener los pedidos');
    }
  },

  async actualizarEstado(pedido_id, nuevoEstado) {
    try {
      const result = await pool.query(
        `UPDATE pedidos SET estado = $1 WHERE id = $2 RETURNING *`,
        [nuevoEstado, pedido_id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error al actualizar estado del pedido:', error);
      throw new Error('No se pudo actualizar el estado');
    }
  },
  async assignConductor(pedidoId, conductorId) {
  const result = await pool.query(
    'UPDATE pedidos SET id_conductor = $1 WHERE id = $2 RETURNING *',
    [conductorId, pedidoId]
  );
  return result.rows[0];
},
};

module.exports = Pedido;
