const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const authController = require('../controllers/AuthController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/', verifyToken, authController.init);

module.exports = router;