// routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middleware/authMiddleware');

// Crear un pedido
router.post('/', authMiddleware, pedidoController.crearPedido);

// Obtener todos los pedidos
router.get('/', authMiddleware, pedidoController.obtenerPedidos);

// Obtener un pedido por ID
router.get('/:id', authMiddleware, pedidoController.obtenerPedidoPorId);

// Obtener pedidos por usuario y estado
router.get('/usuario/:usuario_id/estado/:estado', authMiddleware, pedidoController.obtenerPedidosPorEstado);

// Actualizar estado del pedido
router.put('/:id/estado', authMiddleware, pedidoController.actualizarEstado);

// Asignar conductor
router.put('/:id/conductor', authMiddleware, pedidoController.asignarConductor);

module.exports = router;
