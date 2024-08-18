const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const placeMiddleware = require('../middlewares/placeMiddleware');


router.post('/addPlace', authController.verifyToken, placeController.addPlace);
router.post('/acceptGuide', authController.verifyToken, adminController.validateGuide, adminController.acceptGuide);
router.post('/rejectGuide', authController.verifyToken, adminController.validateGuide, adminController.rejectGuide);
router.get('/rejectGuide/deep/:id',  adminController.rejectGuide);


router.get('/getAllGuides', authController.verifyToken, adminController.guides);
router.get('/guideRequests', authController.verifyToken, adminController.invalidGuides);
router.get('/getGuide/:id', authController.verifyToken, adminController.guide);


router.get('/getPlaces/:lang?/:cityId/:catId', authController.verifyToken, placeController.adminPlaces);

router.get('/getAllGuides/deep', adminController.guides);
router.get('/getGuide/deep/:id', adminController.guide);

router.post('/activatePlace', authController.verifyToken, placeController.activatePlace);

router.get('/editablePlace/:id', authController.verifyToken, placeController.editablePlace);

router.post('/editPlaceDetails', authController.verifyToken, placeController.editPlaceDetails);
router.post('/deletePlaceImages', authController.verifyToken, placeController.deletePlaceImages);
router.post('/uploadPlaceImages', authController.verifyToken, placeController.uploadPlaceImages);


router.get('/isActive/:place_id', authController.verifyToken, placeController.isActive);


module.exports = router; 