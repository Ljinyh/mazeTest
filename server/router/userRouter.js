const express = require('express');
const userController = require('../controller/userController');
const wrapAsync = require("../middleWare/errorHandler");

const router = express.Router();

// 인증번호 문자 발송 API
router.post('/sms', wrapAsync(userController.sendSMS));

// 인증번호 확인 API
router.post('/check-code', wrapAsync(userController.checkCode));

// 로그인 & 회원가입 API
router.post('/signup', wrapAsync(userController.signup));

module.exports = router;
