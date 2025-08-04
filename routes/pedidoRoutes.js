// routes/orderRoutes.js
const express = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.post('/', pedidoController.create);
router.get('/:usuario_id/:estado', pedidoController.getByEstadoYCliente);
router.put('/estado/:id', pedidoController.cambiarEstado);
router.put('/:pedidoId/asignar-conductor', pedidoController.assignConductor);
module.exports = router;
