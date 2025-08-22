// models/Pedido.js
const pool = require('../config/db');

const Pedido = {
  async create(pedidoData) {
    const {
      usuario_id,
      direccion_id,
      direccion,
      latitud,
      longitud,
      info_extra,
      metodo_pago,
      productos, // [{ producto_id, cantidad }]
    } = pedidoData;

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Insertar pedido
      const pedidoResult = await client.query(
        `INSERT INTO pedidos 
          (usuario_id, direccion_id, direccion, latitud, longitud, info_extra, metodo_pago)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [usuario_id, direccion_id || null, direccion || null, latitud || null, longitud || null, info_extra || null, metodo_pago]
      );

      const pedido = pedidoResult.rows[0];
      let montoTotal = 0;

      // Insertar productos
      for (const prod of productos) {
        const prodRes = await client.query(
          'SELECT precio_unitario FROM productos WHERE idproducto = $1',
          [prod.producto_id]
        );
        if (prodRes.rows.length === 0) {
          throw new Error(`Producto con id ${prod.producto_id} no existe`);
        }
        const precioUnitario = prodRes.rows[0].precio_unitario;
        montoTotal += precioUnitario * prod.cantidad;

        await client.query(
          `INSERT INTO pedidoproducto (pedido_id, producto_id, cantidad, precio_unitario)
           VALUES ($1, $2, $3, $4)`,
          [pedido.id, prod.producto_id, prod.cantidad, precioUnitario]
        );
      }

      // Actualizar montos
      const updateResult = await client.query(
        `UPDATE pedidos 
         SET monto_total = $1, monto_pendiente = $1, monto_pagado = 0
         WHERE id = $2 RETURNING *`,
        [montoTotal, pedido.id]
      );

      await client.query('COMMIT');
      return updateResult.rows[0];

    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error al crear pedido:', error);
      throw new Error('No se pudo crear el pedido');
    } finally {
      client.release();
    }
  },

  async getAll() {
    try {
      const result = await pool.query(
        `SELECT * FROM pedidos ORDER BY id DESC`
      );
      return result.rows;
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      throw new Error('No se pudo obtener los pedidos');
    }
  },

  async getById(pedido_id) {
  try {
    const pedidoRes = await pool.query(
      `SELECT * FROM pedidos WHERE id = $1`,
      [pedido_id]
    );
    if (pedidoRes.rows.length === 0) return null;

    const pedido = pedidoRes.rows[0];
    return pedido;

  } catch (error) {
    console.error('Error al obtener detalle de pedido:', error);
    throw new Error('No se pudo obtener el pedido');
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

  async assignConductor(pedidoId, id_conductor) {
    try {
      const result = await pool.query(
        `UPDATE pedidos SET id_conductor = $1 WHERE id = $2 RETURNING *`,
        [id_conductor, pedidoId]
      );
      console.log("id_conductor de model:"+id_conductor)
      return result.rows[0];
    } catch (error) {
      console.error('Error al asignar conductor:', error);
      throw new Error('No se pudo asignar el conductor');
    }
  },
};

module.exports = Pedido;
