var express = require('express');
var router = express.Router();
const markersController = require('../controllers/MarkersController');

router.get('', markersController.get)


module.exports = router;