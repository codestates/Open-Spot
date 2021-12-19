const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');

router.post('/google', authController.GetGoogleAPI);
router.post('/naver', authController.GetNaverAPI);
router.post('/kakao', authController.GetKakaoAPI);

router.post('/local', authController.localSignIn);
router.get('/local', authController.logout);

module.exports = router;
