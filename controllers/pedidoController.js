// controllers/pedidoController.js
const Pedido = require('../models/Pedido');

const pedidoController = {
  // Crear pedido
  async crearPedido(req, res) {
    try {
      const pedido = await Pedido.create(req.body);
      res.status(201).json(pedido);
    } catch (error) {
      console.error('Error al crear pedido:', error);
      res.status(500).json({ error: 'No se pudo crear el pedido' });
    }
  },

  // Obtener todos los pedidos
  async obtenerPedidos(req, res) {
    try {
      const pedidos = await Pedido.getAll();
      res.json(pedidos);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      res.status(500).json({ error: 'No se pudieron obtener los pedidos' });
    }
  },

  // Obtener pedido por ID
  async obtenerPedidoPorId(req, res) {
    try {
      const pedido = await Pedido.getById(req.params.id);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      res.json(pedido);
    } catch (error) {
      console.error('Error al obtener pedido por ID:', error);
      res.status(500).json({ error: 'No se pudo obtener el pedido' });
    }
  },

  // Obtener pedidos por usuario y estado
  async obtenerPedidosPorEstado(req, res) {
    try {
      const { usuario_id, estado } = req.params;
      const pedidos = await Pedido.getByEstadoYCliente(usuario_id, estado);
      res.json(pedidos);
    } catch (error) {
      console.error('Error al obtener pedidos por estado:', error);
      res.status(500).json({ error: 'No se pudo obtener los pedidos' });
    }
  },

  // Actualizar estado de un pedido
  async actualizarEstado(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      const pedido = await Pedido.actualizarEstado(id, estado);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      res.json(pedido);
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      res.status(500).json({ error: 'No se pudo actualizar el estado' });
    }
  },

  // Asignar conductor
  async asignarConductor(req, res) {
    try {
      const { id } = req.params;
      const { id_conductor } = req.body;
      console.log("req.body:", id);
      console.log("req.params:", id_conductor);
      const pedido = await Pedido.assignConductor(id, id_conductor);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      res.json(pedido);
    } catch (error) {
      console.error('Error al asignar conductor:', error);
      res.status(500).json({ error: 'No se pudo asignar conductor' });
    }
  }
};

module.exports = pedidoController;
