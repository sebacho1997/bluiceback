const express = require('express');
const router = express.Router();
const direccionController = require('../controllers/direccionController');

router.post('/', direccionController.create);
router.get('/:id', direccionController.getById);
router.get('/usuario/:usuario_id', direccionController.getByUserId);
router.put('/:id', direccionController.update);
router.delete('/:id', direccionController.delete);

module.exports = router;
