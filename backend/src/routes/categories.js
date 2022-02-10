const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/CategoryController');

router.get('/', categoryController.showAll);
router.post('/', categoryController.addNew);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router;