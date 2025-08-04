const Pedido = require('../models/Pedido');

const pedidoController = {
  // Crear un pedido
  async create(req, res) {
    try {
      const {
        usuario_id,
        direccion_id, // opcional
        direccion,
        latitud,
        longitud,
        info_extra,
        metodo_pago,
        productos
      } = req.body;

      // Validación básica
      if (!usuario_id || !metodo_pago || !productos || productos.length === 0) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
      }

      const pedido = await Pedido.create({
        usuario_id,
        direccion_id,
        direccion,
        latitud,
        longitud,
        info_extra,
        metodo_pago,
        productos
      });

      res.status(201).json({ mensaje: 'Pedido creado exitosamente', pedido });

    } catch (error) {
      console.error('Error al crear pedido:', error);
      res.status(500).json({ error: 'No se pudo crear el pedido' });
    }
  },

  // Obtener pedidos por estado y cliente
  async getByEstadoYCliente(req, res) {
    try {
      const { usuario_id, estado } = req.params;

      const pedidos = await Pedido.getByEstadoYCliente(usuario_id, estado);

      res.status(200).json(pedidos);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      res.status(500).json({ error: 'No se pudieron obtener los pedidos' });
    }
  },

  // Cambiar estado del pedido
  async cambiarEstado(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      if (!estado) {
        return res.status(400).json({ error: 'Estado requerido' });
      }

      const pedidoActualizado = await Pedido.actualizarEstado(id, estado);

      res.status(200).json({ mensaje: 'Estado actualizado', pedido: pedidoActualizado });
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      res.status(500).json({ error: 'No se pudo actualizar el estado' });
    }
  },
  async assignConductor(req, res) {
  try {
    const { pedidoId } = req.params;
    const { conductorId } = req.body;

    if (!conductorId) {
      return res.status(400).json({ error: 'Conductor ID es requerido' });
    }

    const pedidoActualizado = await Pedido.assignConductor(pedidoId, conductorId);
    if (!pedidoActualizado) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json({ mensaje: 'Conductor asignado', pedido: pedidoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al asignar conductor' });
  }
},
};

module.exports = pedidoController;
