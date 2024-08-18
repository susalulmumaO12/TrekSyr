const Joi = require('joi');
const mailer = require('../utils/mailer');
const { sequelize } = require('../../db/models');
const { User, Trip, trip_path, Place, booked_trip, fcm_tokens } = require('../../db/models');
const { QueryTypes, where } = require('sequelize');
const fs = require('fs');
const path = require("node:path");
const admin = require('firebase-admin');
const { convertStringToNumber } = require('convert-string-to-number');
require('dotenv').config();

const { Op } = require('sequelize');
const { type } = require('os');
const { imageConvert } = require('../utils/base64Image');

exports.bookings = async (req, res) => {

    try {
        const {userId} = req.params;

        const {lang} = req.params;

        let selectClause;
        if (lang === 'ar') {
            console.log('inside if lang');
            selectClause = `ar_name AS name, ar_info AS info, ar_gathering_place AS gathering_place,`;
        }
        else {
            selectClause = `name, info, gathering_place,`;
        }

        const bookedTrips = await sequelize.query(`SELECT 
    t.trip_id,
    t.guide_id,
    CONCAT(u.first_name, ' ', u.last_name) AS guide_name,
    ${selectClause}
    t.price,
    DATE_FORMAT(t.starting_time, '%Y/%m/%d') AS starting_time,
    TIMESTAMPDIFF(HOUR, t.starting_time, t.ending_time) AS duration,
    
    t.image AS image
FROM
    trek.booked_trips bt
        JOIN
    trek.trips t ON bt.trip_id = t.trip_id
        LEFT JOIN
    users u ON t.guide_id = u.user_id
WHERE
    bt.user_id = ${userId};
`);

            if(bookedTrips[0].length == 0){
                return res.status(404).json({message: 'Oops! you haven\'t booked any trips!'});
            }

            const bookedTripsWimages = imageConvert(bookedTrips);

            console.log(bookedTripsWimages);

            return res.status(200).send(bookedTripsWimages[0]);

    } catch (error) {
        console.error('Failed to fetch bookings:', error);
        res.status(500).json({ error: error.message, message: 'Failed to fetch bookingssss' });
    }
};
exports.validateBooking = async (req, res) => {
    try {
        const { tripId, userId} = req.params; 

        console.log({tripId, userId});
        //Check if the trip exists
        const trip = await Trip.findByPk(tripId);
        //console.log(trip);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }


        // Check for overlapping bookings
        const bookings = await sequelize.query(`SELECT 
    bt.booked_trip_id, 
    t.starting_time, 
    t.ending_time,
    t.trip_id
FROM
    trek.booked_trips bt
JOIN
    trek.trips t ON bt.trip_id = t.trip_id
WHERE
    bt.user_id = ${userId};
`, {type: QueryTypes.SELECT});

console.log(bookings[0].starting_time);

        for (let i=0; i<bookings.length; i++) {
            
            let oldTrip = bookings[i];
//console.log(oldTrip);
            console.log(`now comparing ${oldTrip.starting_time} with ${trip.starting_time}`);
            if (
                (new Date(trip.starting_time) >= new Date(oldTrip.starting_time) && 
                 new Date(trip.starting_time) <= new Date(oldTrip.ending_time)) ||
                (new Date(trip.ending_time) >= new Date(oldTrip.starting_time) && 
                 new Date(trip.ending_time) <= new Date(oldTrip.ending_time)) ||
                (new Date(trip.starting_time) >= new Date(oldTrip.starting_time) && 
                 new Date(trip.starting_time) <= new Date(oldTrip.ending_time))
            ) {
                return res.status(400).json({message: 'You have a conflicting booking within the same time range'});
            }
        }

        return res.status(200).json({message: 'You can book this trip! please fill in your card info'});
        //next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.error('Failed to validate booking:', error);
        res.status(500).json({ error: error.message, message: 'Failed to validate booking' });
    }
};

exports.bookTrip = async (req, res) => {
    try {
        const { tripId, userId } = req.params;

        const {paymentIntentId} = req.body;
        // 1. Validate payment confirmation (e.g., check if payment is successful)
        /* if (!paymentConfirmation) { // Replace with your payment validation logic
            return res.status(400).json({ message: 'Payment confirmation is missing' });
        } */

        // 2. Create a new booking record
        const newBooking = await booked_trip.create({
            trip_id: tripId,
            user_id: userId,
            paymentIntentId: paymentIntentId
        });

        const trip = await Trip.findByPk(tripId);
        const fcmtokens = await fcm_tokens.findAll({where: {user_id: trip.guide_id}});
        let tokens = [];
        for (let i = 0; i < fcmtokens.length; i++) {
            tokens.push(fcmtokens[i].token);
        }
        const message = {
            notification: {
                title: 'A new booking is created!',
                body: `Someone just booked your trip called ${trip.name}!`
            },
            tokens: tokens
        };
        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            console.log('Successfully sent message:', response);

        } catch (error) {
            console.log(error);
        }


        res.status(200).json({ message: 'Trip booked successfully!', bookingId: newBooking.id }); 
    } catch (error) {
        console.error('Failed to book trip:', error);
        res.status(500).json({ error: error.message, message: 'Failed to book trip' });
    }
}

exports.validateRefund = async (req, res) => {
    try {
        const { tripId } = req.params;

        const trip = await Trip.findByPk(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        const currentDate = new Date();
        let refundType;
        let refundPercentage;

        if (currentDate < new Date(trip.closing_date)) {
            refundType = 'full';
            refundPercentage = 1.0;  // 100%
        } else if (currentDate.toDateString() === new Date(trip.closing_date).toDateString()) {
            refundType = 'partial';
            refundPercentage = 0.5;  // 50%
        } else {
            refundType = 'non';
            refundPercentage = 0.0;  // 0%
        }

        // Calculate the refund amount
        const refundAmount = trip.price * refundPercentage;

        res.status(200).json({ refund_type: refundType, refund_amount: refundAmount });
    } catch (error) {
        console.error('Failed to validate refund:', error);
        res.status(500).json({ error: error.message, message: 'Failed to validate refund' });
    }
};


exports.cancelBooking = async (req, res) => {
    try {
        const { user_id, trip_id } = req.body;

        // Fetch the booking details
        const booking = await booked_trip.findOne({where: {user_id, trip_id}});
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }


        // Delete the booking record
        await booking.destroy();

        const trip = await Trip.findByPk(trip_id);
        const fcmtokens = await fcm_tokens.findAll({where: {user_id: trip.guide_id}});
        let tokens = [];
        for (let i = 0; i < fcmtokens.length; i++) {
            tokens.push(fcmtokens[i].token);
        }
        const message = {
            notification: {
                title: 'Someone just cancelled..',
                body: `Someone just cancelled their booking in your trip called ${trip.name}!`
            },
            tokens: tokens
        };
        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            console.log('Successfully sent message:', response);

        } catch (error) {
            console.log(error);
        }

        res.status(200).json({ message: 'Booking canceled successfully!' });
    } catch (error) {
        console.error('Failed to cancel booking:', error);
        res.status(500).json({ error: error.message, message: 'Failed to cancel booking' });
    }
};