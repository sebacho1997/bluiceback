// routes/orderRoutes.js
const express = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.post('/', pedidoController.create);
router.get('/:usuario_id', pedidoController.getPedidosPorEstado);
router.put('/estado/:pedido_id', pedidoController.actualizarEstado);
module.exports = router;
