const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const imageController = require('../Controllers/ImageController');

// multer setting
const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    // convert a file name
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  })
});

router.post('', upload.single('img'), imageController.uploadImage);

module.exports = router;
