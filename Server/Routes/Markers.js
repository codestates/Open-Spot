const express = require('express');
const router = express.Router();
const markersController = require('./../Controllers/MarkersController');

router.get('', markersController.getAllMarkers);
router.post('', markersController.addMarker);

module.exports = router;
