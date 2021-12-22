const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');

// router.post('/google', authController.GetGoogleAPI);
router.post('/google', authController.GetGoogleAPI);
router.post('/naver', authController.GetNaverAPI);
router.post('/kakao', authController.GetKakaoAPI);

router.post('/local-general', authController.localSignInGen);
router.post('/local-business', authController.localSignInBus);
router.get('/local', authController.logout);

module.exports = router;
