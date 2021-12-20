const express = require('express');
const router = express.Router();
const usersController = require('./../Controllers/UsersController');

router.post('', usersController.signUp);
router.patch('', usersController.changeUserInfo);
router.delete('', usersController.deleteUserInfo);

module.exports = router;
