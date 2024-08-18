const express = require('express');
const router = express.Router();
const mailer = require('../utils/mailer');
const userAuthController = require('../controllers/userAuthController');
const authController = require('../controllers/authController');

router.post('/registerUser', userAuthController.registerUser);
router.post('/registerGuide', userAuthController.registerGuide);

router.post('/sendCode', mailer.sendCode);
router.post('/sendPassword', mailer.sendPassword);

router.post('/verifyUser', userAuthController.verifyUser);

router.post('/loginUser', userAuthController.loginUser);

router.post('/resetPassword', authController.verifyToken, userAuthController.resetPassword);

router.get('/logoutUser', authController.verifyToken, userAuthController.logoutUser);


router.get('/verifyToken', authController.verifyToken, authController.random);


router.post('/resetName', authController.verifyToken, userAuthController.resetName);
router.post('/resetEmail', authController.verifyToken, userAuthController.resetEmail);
router.post('/resetPhone', authController.verifyToken, userAuthController.resetPhone);
router.post('/profilePic', authController.verifyToken, userAuthController.uploadProfilePic);

/* 
router.post('/', authController.random);

router.post('/gen', authController.generateToken); */

module.exports = router; 
