const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');

router.post('/local', authController.localSignIn);

module.exports = router;
