const Pedido = require('../models/Pedido');

const pedidoController = {
  async create(req, res) {
    try {
      const {
        usuario_id,
        direccion,
        latitud,
        longitud,
        info_extra,
        metodo_pago,
        productos
      } = req.body;

      if (!usuario_id || !direccion || !metodo_pago || !productos || productos.length === 0) {
        return res.status(400).json({ error: 'Datos incompletos' });
      }

      const pedido = await Pedido.create({ usuario_id, direccion, latitud, longitud, info_extra, metodo_pago, productos });
      res.status(201).json({ mensaje: 'Pedido creado', pedido });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  
  async getPedidosPorEstado(req, res) {
  try {
    const { usuario_id } = req.params;
    const { estado } = req.query;

    if (!usuario_id || !estado) {
      return res.status(400).json({ error: 'Usuario o estado no especificado' });
    }

    const pedidos = await Pedido.getPedidosPorEstado(usuario_id, estado);
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
},
async actualizarEstado(req, res) {
  try {
    const { pedido_id } = req.params;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ error: 'Estado no especificado' });
    }

    const actualizado = await Pedido.actualizarEstado(pedido_id, estado);
    res.json({ mensaje: 'Estado actualizado', pedido: actualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
  }
},
};

module.exports = pedidoController;
