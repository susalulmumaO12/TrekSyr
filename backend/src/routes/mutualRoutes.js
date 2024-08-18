const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authController = require('../controllers/authController');
const userAuthController = require('../controllers/userAuthController');
const userController = require('../controllers/userController');
const placeController = require('../controllers/placeController');
const adminController = require('../controllers/adminController');


router.get('/placeDetails/:lang?/:id', authController.verifyToken, placeController.place);
router.get('/placeImages/:id', authController.verifyToken, placeController.placeImages);
router.get('/placesNames/:lang?', authController.verifyToken, placeController.placesList);
router.get('/cities/:lang?', authController.verifyToken, placeController.citiesList);
router.get('/categories/:lang?', authController.verifyToken, placeController.categoriesList);


router.get('/profile/:user_id', authController.checkGuest, authController.verifyToken, userController.profile);


router.post('/fcmToken', userAuthController.fcmToken);

module.exports = router;