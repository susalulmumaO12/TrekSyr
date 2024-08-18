const Joi = require('joi');
const mailer = require('../utils/mailer');
const { sequelize } = require('../../db/models');
const { User, Trip, trip_path, Place, booked_trip, trip_path_status } = require('../../db/models');
const { QueryTypes, where } = require('sequelize');
const fs = require('fs');
const path = require("node:path");
const admin = require('firebase-admin');
const { convertStringToNumber } = require('convert-string-to-number');
const translate = require('translate-google');
const { ga } = require('translate-google/languages');
require('dotenv').config();

exports.userGuideTrips = async (req, res) => {

    try {
        const id = convertStringToNumber(req.params.id);
        const byDur = convertStringToNumber(req.params.byDur);

        const { lang } = req.params;

        let selectClause;
        if (lang === 'ar') {
            selectClause = `ar_name AS name,`;
        }
        else {
            selectClause = `name, `
        }

        console.log('\n\n\nreq params', req.params.byDur);
        let tripsQuery;
        let orderClause;

        if (byDur == 1) {
            orderClause = `ORDER BY duration`;
        } else {
            orderClause = `ORDER BY price`;
        }

        tripsQuery = `SELECT trip_id, ${selectClause} price, DATE_FORMAT(starting_time, '%Y/%m/%d') AS starting_time, HOUR(ending_time - starting_time) AS duration, image FROM trips WHERE guide_id = ${id} ${orderClause}`;

        let trips = await sequelize.query(tripsQuery, { replacements: { id } });

        if (trips[0].length != 0) {
            // Modify the guide data to include the image
            for (let i = 0; i < trips[0].length; i++) {

                if (trips[0][i].image) {
                    const imagePath = path.join(__dirname, trips[0][i].image);
                    const imageData = fs.readFileSync(imagePath); // Read the image file
                    trips[0][i].image = imageData.toString('base64'); // Convert to Base64
                }
            }

            return res.status(200).send(trips[0]);
        } else {
            return res.status(404).json({ message: "This guide has no trips" });
        }
    } catch (error) {
        if (error) {
            return res.status(500).json({ error: error, message: "Failed to fetch trips" });
        }
    }
};

exports.finishedTrips = async (req, res) => {

    try {
        const id = req.params.id;
        const byDur = convertStringToNumber(req.params.byDur);

        console.log('\n\n\nreq params', req.params.byDur);
        let tripsQuery;
        let orderClause;

        if (byDur === 1) {
            orderClause = `ORDER BY duration`;
        } else {
            orderClause = `ORDER BY starting_time`;
        }

        tripsQuery = `SELECT 
    t.trip_id,
    t.name,
    t.price,
    CONCAT(COUNT(b.user_id), '/', t.capacity) AS tourists,
    DATE_FORMAT(t.starting_time, '%Y/%m/%d') AS starting_time,
    HOUR(t.ending_time - t.starting_time) AS duration,
    t.image
FROM
    trips t
        LEFT JOIN
    booked_trips b ON t.trip_id = b.trip_id
WHERE
    guide_id = 2 AND ending_time < now()
GROUP BY trip_id , name , price , image
${orderClause}`;

        let trips = await sequelize.query(tripsQuery, { replacements: { id } });

        if (trips[0].length != 0) {
            // Modify the guide data to include the image
            for (let i = 0; i < trips[0].length; i++) {

                if (trips[0][i].image) {
                    const imagePath = path.join(__dirname, trips[0][i].image);
                    const imageData = fs.readFileSync(imagePath); // Read the image file
                    trips[0][i].image = imageData.toString('base64'); // Convert to Base64
                }
            }

            return res.status(200).send(trips[0]);
        } else {
            return res.status(404).json({ message: "This guide has no finished trips" });
        }
    } catch (error) {
        if (error) {
            return res.status(500).json({ error: error, message: "Failed to fetch trips" });
        }
    }
};

exports.upcomingTrips = async (req, res) => {

    try {
        const id = req.params.id;
        const byDur = convertStringToNumber(req.params.byDur);

        console.log('\n\n\nreq params', req.params.byDur);
        let tripsQuery;
        let orderClause;

        if (byDur == 1) {
            orderClause = `ORDER BY duration`;
        } else {
            orderClause = `ORDER BY starting_time DESC`;
        }

        tripsQuery = `SELECT 
    t.trip_id,
    t.name,
    t.price,
    CONCAT(COUNT(b.user_id), '/', t.capacity) AS tourists,
    DATE_FORMAT(t.starting_time, '%Y/%m/%d') AS starting_time,
    TIMESTAMPDIFF(HOUR, t.starting_time, t.ending_time) AS duration,
    t.image
FROM
    trips t
        LEFT JOIN
    booked_trips b ON t.trip_id = b.trip_id
WHERE
    guide_id = 2 AND starting_time > now()
GROUP BY trip_id , name , price , image
${orderClause}`;

        let trips = await sequelize.query(tripsQuery, { replacements: { id } });

        if (trips[0].length != 0) {
            // Modify the guide data to include the image
            for (let i = 0; i < trips[0].length; i++) {

                if (trips[0][i].image) {
                    const imagePath = path.join(__dirname, trips[0][i].image);
                    const imageData = fs.readFileSync(imagePath); // Read the image file
                    trips[0][i].image = imageData.toString('base64'); // Convert to Base64
                }
            }

            return res.status(200).send(trips[0]);
        } else {
            return res.status(404).json({ message: "This guide has no upcoming trips" });
        }
    } catch (error) {
        if (error) {
            return res.status(500).json({ error: error, message: "Failed to fetch trips" });
        }
    }
};


exports.userTripDetails = async (req, res) => {

    try {
        const id = req.params.id;

        const { lang } = req.params;
        let selectClause;
        if (lang === 'ar') {
            console.log('inside if lang');
            selectClause = `ar_name AS name, ar_info AS info, ar_gathering_place AS gathering_place,`;
        }
        else {
            selectClause = `name, info, gathering_place,`;
        }

        const tripsQuery = `SELECT ${selectClause} price, DATE_FORMAT(starting_time, '%Y/%m/%d') AS starting_time, DATE_FORMAT(ending_time, '%Y/%m/%d') AS ending_time, capacity, DATE_FORMAT(closing_date, '%Y/%m/%d') AS closing_date, image  FROM trips WHERE trip_id = :id`;
        let tripDetails = await sequelize.query(tripsQuery, { replacements: { id } });

        if (tripDetails[0].length != 0) {
            for (let i = 0; i < tripDetails[0].length; i++) {

                if (tripDetails[0][i].image) { //remember to create a folder for trip images
                    const imagePath = path.join(__dirname, tripDetails[0][i].image);
                    const imageData = fs.readFileSync(imagePath); // Read the image file
                    tripDetails[0][i].image = imageData.toString('base64'); // Convert to Base64
                }
            }

            return res.status(200).send(tripDetails[0][0]);
        } else {
            return res.status(404).json({ message: "This guide has no trips" });
        }
    } catch (error) {
        if (error) {
            return res.status(500).json({ error: error, message: "Failed to fetch trips" });
        }
    }
};

exports.guideTripDetails = async (req, res) => {

    try {
        const id = req.params.id;

        const { lang } = req.params;
        let selectClause;
        if (lang === 'ar') {
            console.log('inside if lang');
            selectClause = `ar_name AS name, ar_info AS info, ar_gathering_place AS gathering_place,`;
        }
        else {
            selectClause = `name, info, gathering_place,`;
        }

        const tripsQuery = `SELECT 
    t.trip_id,
    ${selectClause}
    price,
    CONCAT(COUNT(b.user_id), '/', t.capacity) AS tourists,
    capacity,
    DATE_FORMAT(starting_time, '%Y/%m/%d') AS f_starting_time,
    starting_time,
    DATE_FORMAT(ending_time, '%Y/%m/%d') AS f_ending_time,
    ending_time,
    DATE_FORMAT(closing_date, '%Y/%m/%d') AS closing_date,
    image
FROM
    trips t
        LEFT JOIN
    booked_trips b ON t.trip_id = b.trip_id
WHERE
    t.trip_id = :id`;
        let tripDetails = await sequelize.query(tripsQuery, { replacements: { id } });

        if (tripDetails[0].length != 0) {
            for (let i = 0; i < tripDetails[0].length; i++) {

                if (tripDetails[0][i].image) { //remember to create a folder for trip images
                    const imagePath = path.join(__dirname, tripDetails[0][i].image);
                    const imageData = fs.readFileSync(imagePath); // Read the image file
                    tripDetails[0][i].image = imageData.toString('base64'); // Convert to Base64
                }
            }

            return res.status(200).send(tripDetails[0][0]);
        } else {
            return res.status(404).json({ message: "This guide has no trips" });
        }
    } catch (error) {
        if (error) {
            return res.status(500).json({ error: error, message: "Failed to fetch trips" });
        }
    }
};

exports.tripPath = async (req, res) => {
    try {
        const id = req.params.id;
        const { lang } = req.params;
        const tripsQuery = `
        SELECT 
        @order:=@order + 1 AS 'order',
        time,
        place,
        type
    FROM
        (SELECT 
            DATE_FORMAT(tp.time, '%h:%i %p, %a') AS time,
            ${lang == 'ar' ? `pl.ar_name` : `pl.name`} AS place,
            pl.category_id AS type
        FROM
            trip_paths tp
                JOIN
            places pl ON tp.place_id = pl.place_id
        WHERE
            tp.trip_id = :id
        ORDER BY tp.time) AS derivedTable,
        (SELECT @order := 0) AS var
      `;

        const tripPath = await sequelize.query(tripsQuery, {
            replacements: { id },
            type: QueryTypes.SELECT
        });

        if (tripPath.length !== 0) {
            // Correct access to the 'type' property
            for (let i = 0; i < tripPath.length; i++) {
                console.log('\n\n\ninside for');
                if (tripPath[i].type == 5) {
                    tripPath[i].type = "Restaurant";
                } else if (tripPath[i].type == 6) {
                    tripPath[i].type = "Hotel";
                } else {
                    tripPath[i].type = "Ruin";
                }
            }
            return res.status(200).send(tripPath);
        } else {
            return res.status(404).json({ message: "This trip has no path" });
        }
    } catch (error) {
        console.error("Failed to fetch trips:", error);
        return res.status(500).json({ error: error.message, message: "Failed to fetch trips" });
    }
};

exports.guideTripPath = async (req, res) => {
    try {
        const id = req.params.id;
        const { lang } = req.params;
        const tripsQuery = `
        SELECT 
    trip_path_id,
    @order:=@order + 1 AS 'order',
    time,
    formatted_time,
    place,
    type,
    EXISTS( SELECT 
            trip_path_id
        FROM
            trip_path_statuses tps
        WHERE
            tps.trip_path_id = derivedTable.trip_path_id) AS visited
FROM
    (SELECT 
        tp.trip_path_id AS trip_path_id,
            DATE_FORMAT(tp.time, '%h:%i %p, %a') AS formatted_time,
            
    (SELECT 
        tp.time) AS time,
            
            ${lang == 'ar' ? `pl.ar_name` : `pl.name`} AS place,
            pl.category_id AS type
    FROM
        trip_paths tp
    JOIN places pl ON tp.place_id = pl.place_id
    WHERE
        tp.trip_id = :id
    ORDER BY tp.time) AS derivedTable,
    (SELECT @order:=0) AS var;
      `;

        const tripPath = await sequelize.query(tripsQuery, {
            replacements: { id },
            type: QueryTypes.SELECT
        });

        if (tripPath.length !== 0) {
            // Correct access to the 'type' property
            for (let i = 0; i < tripPath.length; i++) {
                console.log('\n\n\ninside for');
                if (tripPath[i].type == 5) {
                    tripPath[i].type = "Restaurant";
                } else if (tripPath[i].type == 6) {
                    tripPath[i].type = "Hotel";
                } else {
                    tripPath[i].type = "Ruin";
                }
            }
            return res.status(200).send(tripPath);
        } else {
            return res.status(404).json({ message: "This trip has no path" });
        }
    } catch (error) {
        console.error("Failed to fetch trips:", error);
        return res.status(500).json({ error: error.message, message: "Failed to fetch trips" });
    }
};

exports.placeTrips = async (req, res) => {

    try {
        const id = req.params.id; //edit available counting

        const { lang } = req.params;

        const tripsQuery = `SELECT t.trip_id, t.guide_id, ${lang == 'ar' ? `t.ar_name AS name` : `t.name AS name`}, t.price, 
       DATE_FORMAT(t.starting_time, '%Y/%m/%d') AS starting_time, 
       TIMESTAMPDIFF(HOUR, t.starting_time, t.ending_time) AS duration, 
       TRUE AS available,
       p.image_path AS image
FROM trips t
JOIN trip_paths tp ON t.trip_id = tp.trip_id
JOIN users g ON t.guide_id = g.user_id
LEFT JOIN profile_pics p ON p.user_id = g.user_id
WHERE tp.place_id = ${id}`;

        let trips = await sequelize.query(tripsQuery, { replacements: { id } });

        if (trips[0].length != 0) {
            // Modify the guide data to include the image
            for (let i = 0; i < trips[0].length; i++) {

                if (trips[0][i].image) {
                    const imagePath = path.join(__dirname, trips[0][i].image);
                    const imageData = fs.readFileSync(imagePath); // Read the image file
                    trips[0][i].image = imageData.toString('base64'); // Convert to Base64
                }
            }

            return res.status(200).send(trips[0]);
        }

        return res.status(404).json({ message: 'no trips in this place yet' });
    } catch (error) {
        if (error) {
            console.error("Failed to fetch trips:", error);
            return res.status(500).json({ error: error.message, message: "Failed to fetch trips" });
        }
    }
};

exports.addTrip = async (req, res) => {
    try {
        const {
            guide_id, name, price, info, starting_time, ending_time,
            gathering_place, capacity, closing_date
        } = req.body;

        const placeNames = req.body.places.map(place => place.place_name)
            .map(name => `'${name.replace(/'/g, "''")}'`) // Escape single quotes
            .join(", ");
        const imageFetchQuery = `SELECT pi.place_id, pi.image_path AS image FROM place_images pi LEFT JOIN places p ON pi.place_id = p.place_id WHERE p.category_id NOT IN (5, 6, 7) AND p.name IN (${placeNames}) LIMIT 1`;
        const imageResult = await sequelize.query(imageFetchQuery, { type: QueryTypes.SELECT });
        let image;
        image = imageResult[0].image;

        let ar_name = await translate(name, { to: 'ar' });
        let ar_info = await translate(info, { to: 'ar' });
        let ar_gathering_place = await translate(gathering_place, { to: 'ar' });
        // Start a transaction
        const result = await sequelize.transaction(async (t) => {
            // Insert into trips table
            const newTrip = await Trip.create({
                guide_id, name, ar_name, price, info, ar_info, starting_time, ending_time,
                gathering_place, ar_gathering_place, capacity, closing_date, image
            }, { transaction: t });

            // Insert into trip_paths table
            const tripPathsData = req.validatedPlaces.map((place) => {
                const matchedPlace = req.placeRecords.find(pr => pr.name === place.place_name);
                return {
                    trip_id: newTrip.trip_id,
                    place_id: matchedPlace.place_id, // Fetch the correct place_id
                    time: place.time
                };
            });

            await trip_path.bulkCreate(tripPathsData, { transaction: t });

            return newTrip;
        });

        const guide = await User.findByPk(guide_id);

        const usersQuery = `SELECT token FROM fcm_tokens ft JOIN users u ON ft.user_id=u.user_id WHERE u.role_id=3;`
        const tokensResult = await sequelize.query(usersQuery, { type: QueryTypes.SELECT });

        let tokens = [];
        for (let i = 0; i < tokensResult.length; i++) {
            tokens.push(tokensResult[i].token);
        }

        console.log(tokens)
        const message = {
            notification: {
                title: 'Check out the new trip!',
                body: `Guide "${guide.first_name}" just posted a new trip called ${name}!`
            },
            tokens: tokens
        };
        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            console.log('Successfully sent message:', response);

        } catch (error) {
            console.log(error);
        }

        res.status(201).json({ message: 'Trip added successfully!' });
    } catch (error) {
        console.error('Failed to add trip:', error);
        res.status(500).json({ error: error.message, message: 'Failed to add trip' });
    }
};


exports.editTrip = async (req, res, next) => {
    try {

        const {
            trip_id,
            name,
            price,
            info,
            starting_time,
            ending_time,
            gathering_place,
            capacity,
            closing_date,
        } = req.body;

        // Fetch the trip by ID
        let trip = await Trip.findByPk(trip_id);

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        trip.name = name || trip.name;
        trip.ar_name = name ? await translate(name, { to: 'ar' }) : trip.ar_name;
        trip.price = price || trip.price;
        trip.info = info || trip.info;
        trip.ar_info = info ? await translate(info, { to: 'ar' }) : trip.ar_info;
        trip.starting_time = starting_time || trip.starting_time;
        trip.ending_time = ending_time || trip.ending_time;
        trip.gathering_place = gathering_place || trip.gathering_place;
        trip.ar_gathering_place = gathering_place ? await translate(gathering_place, { to: 'ar' }) : trip.ar_gathering_place;
        trip.capacity = capacity || trip.capacity;
        trip.closing_date = closing_date || trip.closing_date;

        await trip.save();


        const bookingsQuery = `SELECT 
    ft.token
FROM
    trek.booked_trips bt
        LEFT JOIN
    fcm_tokens ft ON bt.user_id = ft.user_id
WHERE
    bt.trip_id = ${trip_id}`;

        const tokensResult = await sequelize.query(bookingsQuery, { type: QueryTypes.SELECT });

        let tokens = [];
        for (let i = 0; i < tokensResult.length; i++) {
            tokens.push(tokensResult[i].token);
        }

        console.log(tokens)
        const message = {
            notification: {
                title: 'Trip Updated',
                body: `Your trip on "${trip.starting_time.toDateString()}" has been updated. Please check the new details.`
            },
            tokens: tokens
        };
        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            console.log('Successfully sent message:', response);

        } catch (error) {
            console.log(error);
        }

        next();
    } catch (error) {
        console.error('Failed to update trip:', error);
        return res.status(500).json({ error: error.message, message: 'Failed to update trip' });
    }
};

exports.editTripPlaces = async (req, res) => {
    try {
        const { trip_id, places } = req.body;
        const originalTrip = await Trip.findByPk(trip_id);

        let {
            starting_time,
            ending_time
        } = req.body;


        starting_time = starting_time || originalTrip.starting_time;
        ending_time = ending_time || originalTrip.ending_time;

        if (!originalTrip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        if (!places) {
            return res.status(200).json({ message: 'Trip places updated successfully' });
        }
        const tripPath = await trip_path.findAll({ where: { trip_id } });

        const promises = places.map(async (place) => {
            let placeResult = await Place.findOne({ where: { name: place.place_name } });
            if (!placeResult) {
                throw new Error(`Place ${place.place_name} not found`);
            }

            if (place.time && (new Date(place.time) > new Date(ending_time) || new Date(place.time) < new Date(starting_time))) {
                throw new Error(`Time of ${place.place_name} is out of trip date bounds`);
            }

            if (place.trip_path_id === 0) {
                await trip_path.create({
                    trip_id,
                    place_id: placeResult.place_id,
                    time: new Date(place.time)
                });
                return;
            }

            const tripPathElement = await TripPath.findByPk(place.trip_path_id);
            if (!tripPathElement) {
                throw new Error(`TripPath with ID ${place.trip_path_id} not found`);
            }

            if ([5, 6].includes(place.category_id)) {
                tripPathElement.time = place.time || tripPathElement.time;
            } else {
                tripPathElement.place_id = placeResult.place_id;
                tripPathElement.time = place.time || tripPathElement.time;
            }

            await tripPathElement.save();
        });



        await Promise.all(promises);
        res.status(200).json({ message: 'Trip places updated successfully' });

    } catch (error) {
        console.error('Failed to update trip places:', error);
        res.status(500).json({ error: error.message, message: 'Failed to update trip places' });
    }
};

exports.isBookable = async (req, res) => {
    try {
        const { trip_id, user_id } = req.params;

        console.log(`Trip ID is ${trip_id}`);
        const trip = await Trip.findByPk(trip_id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        const tourists = await booked_trip.findAndCountAll({
            where: {
                trip_id: trip_id
            }
        });

        const isBooked = await booked_trip.findOne({ where: { user_id, trip_id } });
        console.log(tourists.count);

        const now = new Date(); // Get current time


        if (new Date(trip.ending_time) < now) {
            return res.status(400).json({ message: 'Trip not available' });
        }
        // Check if trip has already started
        if (new Date(trip.starting_time) < now) {
            return res.status(400).json({ message: 'Trip has already started' });
        }
        if (isBooked) {
            return res.status(200).json({ message: 'Already booked' });
        } else if (tourists.count < trip.capacity) {
            return res.status(200).json({ message: 'Booking is allowed' });
        } else {
            return res.status(400).json({ message: 'Trip is booked up' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Failed to get info' });
    }
};

exports.isCancelable = async (req, res) => {
    try {
        const { trip_id, user_id } = req.params;

        console.log(`Trip ID is ${trip_id}`);
        const trip = await Trip.findByPk(trip_id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        const isBooked = await booked_trip.findOne({ where: { trip_id, user_id } });
        if (!isBooked) {
            return res.status(400).json({ message: 'You are not booked on this trip' });
        }

        const now = new Date(); // Get current time

        // If trip has already ended, cannot cancel
        if (new Date(trip.ending_time) <= now) {
            return res.status(400).json({ message: 'Trip has already ended' });
        }
        // Check if trip has already started
        if (new Date(trip.starting_time) < now) {
            return res.status(400).json({ message: 'Trip has already started' });
        }
        // If the closing date has passed, cannot cancel
        if (new Date(trip.closing_date) < now) {
            return res.status(400).json({ message: 'You are past due closing date' });
        } else if (new Date(trip.closing_date).getDate() === now.getDate()) {
            // If it's the day of the closing date, partial refund
            return res.status(200).json({ message: 'You will receive a partial refund' });
        } else {
            // Otherwise, full refund
            return res.status(200).json({ message: 'You will receive a full refund' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Failed to get info' });
    }
};



exports.updateStatus = async(req, res) => {

    try {
        const {trip_path_id} = req.body;

        await trip_path_status.create({trip_path_id});


        const trip = await trip_path.findOne({where: trip_path_id});

        const trip_id = trip.trip_id;
        const bookingsQuery = `SELECT 
    ft.token
FROM
    trek.booked_trips bt
        LEFT JOIN
    fcm_tokens ft ON bt.user_id = ft.user_id
WHERE
    bt.trip_id = ${trip_id}`;

        const tokensResult = await sequelize.query(bookingsQuery, { type: QueryTypes.SELECT });

        let tokens = [];
        for (let i = 0; i < tokensResult.length; i++) {
            tokens.push(tokensResult[i].token);
        }

        const place = await Place.findOne({where:{place_id: trip.place_id}});
        console.log(tokens)
        const message = {
            notification: {
                title: 'Trip Updated',
                body: `Your trip status got updated. you just arrived to ${place.name} `
            },
            tokens: tokens
        };

        
        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            console.log('Successfully sent message:', response);

        } catch (error) {
            console.log(error);
        }


        return res.status(200).json({message: 'updated succssefully'});
    } catch (error) {
        return res.status(500).json({ error: error.message, message: 'Failed to update' });
    }


};