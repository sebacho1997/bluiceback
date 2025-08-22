const Producto = require('../models/Producto');

const productoController = {
  // Crear un producto
  async crearProducto(req, res) {
    try {
      const { nombre, cantidad,precio_unitario } = req.body;
      const producto = await Producto.create({ nombre, cantidad,precio_unitario });
      res.status(201).json(producto);
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ mensaje: 'No se pudo crear el producto' });
    }
  },

  // Obtener todos los productos
  async obtenerProductos(req, res) {
    try {
      const productos = await Producto.getAll();
      res.json(productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ mensaje: 'No se pudo obtener los productos' });
    }
  },

  // Obtener un producto por id
  async obtenerProductoPorId(req, res) {
    try {
      const { id } = req.params;
      const producto = await Producto.getById(id);
      if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
      res.json(producto);
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({ mensaje: 'No se pudo obtener el producto' });
    }
  },

  // Actualizar un producto
  async actualizarProducto(req, res) {
    try {
      const { id } = req.params;
      const { nombre, cantidad,precio_unitario } = req.body;
      const producto = await Producto.update(id, { nombre, cantidad,pre });
      res.json(producto);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ mensaje: 'No se pudo actualizar el producto' });
    }
  },

  // Eliminar un producto
  async eliminarProducto(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Producto.delete(id);
      if (!eliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
      res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ mensaje: 'No se pudo eliminar el producto' });
    }
  }
};

module.exports = productoController;
