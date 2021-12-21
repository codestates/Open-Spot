const express = require('express');
const router = express.Router();
const usersController = require('./../Controllers/UsersController');

router.post('', usersController.signUp);
router.patch('', usersController.changeUserInfo);
router.delete('', usersController.deleteUserInfo);

router.get('/general-markers', usersController.getGeneralMarkers);
router.get('/business-markers', usersController.getBusinessMarkers);

module.exports = router;
