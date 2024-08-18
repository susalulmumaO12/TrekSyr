const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const userAuthController = require('../controllers/userAuthController');
const placeController = require('../controllers/placeController');
const bookingController = require('../controllers/bookingController');
const searchController = require('../controllers/searchController');


router.get('/getAllGuides/:user_id/:byName', authController.verifyToken, userController.guides);
router.get('/getGuide/:id', authController.verifyToken, userController.guide);
router.get('/guideComments/:id', authController.verifyToken, userController.guideComments);

router.get('/guideTrips/:lang?/:id/:byDur', authController.verifyToken, tripController.userGuideTrips);

router.get('/tripDetails/:lang?/:id', authController.verifyToken, tripController.userTripDetails);
router.get('/tripPath/:lang?/:id', authController.verifyToken, tripController.tripPath);


router.post('/rateGuide', authController.verifyToken, authController.checkGuest, userController.addGuideRate);
router.post('/ratePlace', authController.verifyToken, authController.checkGuest, userController.addPlaceRate);


router.post('/favGuide', authController.checkGuest, authController.verifyToken,  userController.favGuide);
router.post('/favPlace', authController.checkGuest, authController.verifyToken,  userController.favPlace);


router.get('/favoriteGuides/:user_id', authController.checkGuest, authController.verifyToken,  userController.favoriteGuides);
router.get('/favoritePlaces/:lang?/:user_id', authController.checkGuest, authController.verifyToken,  userController.favoritePlaces);


router.get('/getPlaces/:lang?/:userId/:cityId/:catId', authController.verifyToken, placeController.userPlaces);

router.get('/isBookable/:user_id/:trip_id', authController.verifyToken, tripController.isBookable);
router.get('/isCancelable/:user_id/:trip_id', authController.verifyToken, tripController.isCancelable);

router.get('/validateBooking/:userId/:tripId', authController.checkGuest, authController.verifyToken, bookingController.validateBooking);
router.post('/bookTrip/:userId/:tripId', authController.checkGuest, authController.verifyToken, bookingController.bookTrip);
router.get('/bookings/:lang?/:userId', authController.checkGuest, authController.verifyToken, bookingController.bookings);

router.get('/validateRefund/:tripId', authController.checkGuest, authController.verifyToken, bookingController.validateRefund);
router.post('/cancelBooking', authController.checkGuest, authController.verifyToken, bookingController.cancelBooking);
/* router.get('/getAllGuides/deep/:byName', userController.guides);
router.get('/getGuide/deep/:id', userController.guide);
router.get('/guideTrips/deep/:id', tripController.guideTrips);
router.get('/tripDetails/deep/:id', tripController.userTripDetails);
router.get('/tripPath/deep/:id', tripController.tripPath);
 */

router.get('/loginGuest', userAuthController.loginGuest);

router.get('/placeTrips/:lang?/:id', authController.verifyToken, tripController.placeTrips);
router.get('/placeComments/:id', authController.verifyToken, placeController.placeComments);

router.get('/searchPlaces/:lang/:userId', authController.verifyToken, searchController.searchPlaces);
router.get('/searchGuides/:lang/:userId', authController.verifyToken, searchController.searchGuides);
router.get('/searchTrips/:lang', authController.verifyToken, searchController.searchTrips);

/* 
router.get('/getPlaces/deep/:userId/:cityId/:catId', placeController.userPlaces);
 */

module.exports = router; 