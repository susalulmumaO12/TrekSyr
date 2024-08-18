const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authController = require('../controllers/authController');
const placeController = require('../controllers/placeController');
const tripMiddleware = require('../middlewares/tripMiddleware');

router.get('/getPlaces/:lang?/:cityId/:catId', authController.verifyToken, placeController.guidePlaces);
router.post('/addTrip', authController.verifyToken, tripMiddleware.validateTrip, tripController.addTrip);
router.get('/tripDetails/:lang?/:id', authController.verifyToken, tripController.guideTripDetails);
router.get('/tripPath/:lang?/:id', authController.verifyToken, tripController.guideTripPath);

router.post('/editTrip', authController.verifyToken, tripMiddleware.validateEditTrip, tripController.editTrip, tripController.editTripPlaces);

router.get('/getPlaces/deep/:cityId/:catId', placeController.guidePlaces);


router.get('/finishedTrips/:lang?/:id/:byDur', authController.verifyToken, tripController.finishedTrips);
router.get('/upcomingTrips/:lang?/:id/:byDur', authController.verifyToken, tripController.upcomingTrips);
router.post('/updateStatus', authController.verifyToken, tripController.updateStatus);

module.exports = router; 