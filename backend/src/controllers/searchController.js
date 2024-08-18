const Joi = require('joi');
const mailer = require('../utils/mailer');
const { sequelize } = require('../../db/models');
const { User, Place,  City, Trip, place_rating,guide_rating, PlaceImage, favorite_places, favorite_guides, ProfilePic, trip_path } = require('../../db/models');
const { QueryTypes, Op, Sequelize } = require('sequelize');
const upload = require('../utils/upload');
const fs = require('fs');
const path = require("node:path");
const { report } = require('process');
const { imageConvert } = require('../utils/base64Image');
const { type, platform } = require('os');
const {convertStringToNumber} = require('convert-string-to-number');
const Fuse = require('fuse.js');
const { tripPath } = require('./tripController');
const { firestore } = require('firebase-admin');
const translate = require('translate-google');
require('dotenv').config();

exports.searchPlaces = async (req, res) => {
    const { query } = req.query;
    const { lang } = req.params;
    const { userId } = req.params;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Fetch all active places
        const places = await Place.findAll({
            where: { active: true }
        });

        // Fuse.js configuration
        const fuseOptions = {
            keys: ["name", "ar_name", "description", "ar_description", "address", "ar_address"]
        };

        // Initialize Fuse.js with the selected fields
        const fuse = new Fuse(places, fuseOptions);

        // Perform the search
        const searchResults = fuse.search(query).map((result) => result.item);
        if(Object.keys(searchResults).length == 0){
            console.log('yes');
            return res.status(404).json({message: 'no results'});
        }
        // Format the results based on the language
        const formattedResults = await Promise.all(searchResults.map(async place => {
            const city = await City.findByPk(place.city_id);
            const averageRating = await Place.findOne({where: { place_id: place.place_id },
                attributes: [
                  [Sequelize.fn('AVG', Sequelize.col('rate')), 'average_rating'],
                ],
                include: [
                    {
                      model: place_rating,
                      attributes: [],
                    },
                  ],
                  group: ['place_ratings.rate_id'],
                  raw: true
                });

                const {average_rating} = averageRating;
                //console.log(average_rating)
            
                const imagePath = await PlaceImage.findOne({
                    where: { place_id: place.place_id },
                    attributes: ['image_path'],
                    raw: true, // Get the result as a plain object
                });
                let image;
                if (imagePath && imagePath.image_path) { 
                    // Check both imagePath and its property image_path
                    console.log("inside IF-------");
                    const fimagePath = path.join(__dirname,imagePath.image_path);
                    const imageData = fs.readFileSync(fimagePath); // Read the image file
                    image = imageData.toString('base64'); // Convert to Base64
                }
                const isFavortied = await favorite_places.findOne({where: {user_id: userId, place_id: place.place_id}});

                console.log(isFavortied);
                
            return {
                place_id: place.place_id,
                name: lang === 'ar' ? place.ar_name : place.name,
                city: lang === 'ar' ? city.arabic_name : city.name,
                description: lang === 'ar' ? place.ar_description : place.description,
                average_rating: average_rating,
                isFavorite: isFavortied? 1 : 0,
                address: lang === 'ar' ? place.ar_address : place.address,
                image: image
            };
        }));

        // Send the formatted results as the response
        return res.status(200).json(formattedResults);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Search failed' });
    }
};




exports.searchGuides = async (req, res) => {
    const { query } = req.query;
    const { userId } = req.params;
    
    const {lang} = req.params;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }


    try {
        let ar_query;
        let searchResults;

        
        // Search Guides (Users with role_id = 2)
        const guides = await User.findAll({where:{role_id:2, isValidated:true}});
        

        const fuseOptions = {
            keys: [
                "first_name", "last_name"
            ]
        };
        const fuse = new Fuse(guides, fuseOptions);

        

        if(lang == 'ar'){
            ar_query = await translate(query, {to: 'en'});
            
searchResults = fuse.search(ar_query).map((result) => result.item);
        } else {
            
searchResults = fuse.search(query).map((result) => result.item);
        }


if(Object.keys(searchResults).length == 0){
    console.log('yes');
    return res.status(404).json({message: 'no results'});
}
// Format the results based on the language
const formattedResults = await Promise.all(searchResults.map(async guide => {
    
   /*  const averageRating = await User.findOne({
        where: { guide_id: guide.user_id },
        attributes: [
            [Sequelize.fn('AVG', Sequelize.col('guide_ratings.rate')), 'average_rating'],
        ],
        include: [
            {
                model: guide_rating,
                as: 'rated', // Use the correct 'as' value
                attributes: [],
            },
        ],
        group: ['guide_ratings.guide_rating_id'],
        raw: true
    }); */
      
    const averageRating = await sequelize.query(`SELECT 
    AVG(r.rate) AS average_rating
FROM
    trek.users u
        LEFT JOIN
    guide_ratings r ON u.user_id = r.guide_id
WHERE
    u.role_id = 2 AND r.guide_id= ${guide.user_id}
    group by r.guide_id;`, {type: QueryTypes.SELECT});

        const {average_rating} = averageRating[0];
        console.log(average_rating)
    
        const imagePath = await ProfilePic.findOne({
            where: {  user_id: guide.user_id },
            attributes: ['image_path'],
            raw: true, // Get the result as a plain object
        });
        let image;
        if (imagePath && imagePath.image_path) { 
            // Check both imagePath and its property image_path
            console.log("inside IF-------");
            const fimagePath = path.join(__dirname,imagePath.image_path);
            const imageData = fs.readFileSync(fimagePath); // Read the image file
            image = imageData.toString('base64'); // Convert to Base64
        }
        const isFavortied = await favorite_guides.findOne({where: {user_id: userId,  guide_id: guide.user_id}});

        console.log(isFavortied);
        
    return {
        id: guide.user_id,
        first_name: guide.first_name,
        last_name: guide.last_name,
        average_rating: average_rating,
        isFavorite: isFavortied? 1 : 0,
        image: image
    };
}));

// Send the formatted results as the response
return res.status(200).json(formattedResults);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Search failed' });
    }
};



exports.searchTrips = async (req, res) => {
    const { query } = req.query;
    const {lang} =req.params;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }


    try {
        
        // Search Guides (Users with role_id = 2)
        const trips = await Trip.findAll();

        const distinctTripPaths = await trip_path.findAll({
            attributes: ['trip_id'],
            include: [
              {
                model: Place,
                attributes: ['name', 'ar_name'],
              },
            ],
            raw: true,
            group: ['trip_id', 'Place.name', 'Place.ar_name'],
          });

        const fuseOptions = {
            keys: [
                "name", "info", "ar_name", "ar_info", "gathering_place", "ar_gathering_place", "place.name", "place.ar_name"
            ]
        };

        
// Combine the results
const combinedData = [...trips, ...distinctTripPaths];
        
const fuse = new Fuse(combinedData, fuseOptions);


const searchResults = fuse.search(query).map((result) => result.item);

if(Object.keys(searchResults).length == 0){
    console.log('yes');
    return res.status(404).json({message: 'no results'});
}
// Format the results based on the language
const formattedResults = await Promise.all(searchResults.map(async trip => {
    
        const imagePath = await sequelize.query(`SELECT 
    image_path
FROM
    trip_paths tp
        JOIN
    places p ON tp.place_id = p.place_id
        LEFT JOIN
    place_images pi ON pi.place_id = p.place_id
WHERE
    p.category_id NOT IN (5 , 6, 7) AND trip_id=${trip.trip_id}
LIMIT 1` ,{type: QueryTypes.SELECT});

        let image;
        if (imagePath[0] && imagePath[0].image_path) { 
            // Check both imagePath and its property image_path
            console.log("inside IF-------");
            const fimagePath = path.join(__dirname,imagePath[0].image_path);
            const imageData = fs.readFileSync(fimagePath); // Read the image file
            image = imageData.toString('base64'); // Convert to Base64
        }
        
        let date = new Date(trip.starting_time);

// Extract the year, month, and day
let year = date.getUTCFullYear();
let month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
let day = date.getUTCDate().toString().padStart(2, '0');

// Format the date as YYYY/MM/DD
let formattedDate = `${year}/${month}/${day}`;

let differenceInMilliseconds = new Date(trip.ending_time) - new Date(trip.starting_time);

// Convert the difference from milliseconds to hours
let differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

const guide = await User.findByPk(trip.guide_id);

const averageRating = await sequelize.query(`SELECT 
    AVG(r.rate) AS average_rating
FROM
    trek.users u
        LEFT JOIN
    guide_ratings r ON u.user_id = r.guide_id
WHERE
    u.role_id = 2 AND r.guide_id= ${guide.user_id}
    group by r.guide_id;`, {type: QueryTypes.SELECT});

        const {average_rating} = averageRating[0];

        const gimagePath = await ProfilePic.findOne({
            where: {  user_id: guide.user_id },
            attributes: ['image_path'],
            raw: true, // Get the result as a plain object
        });
        let gimage;
        if (gimagePath && gimagePath.image_path) { 
            // Check both imagePath and its property image_path
            console.log("inside IF-------");
            const fgimagePath = path.join(__dirname,gimagePath.image_path);
            const gimageData = fs.readFileSync(fgimagePath); // Read the image file
            gimage = gimageData.toString('base64'); // Convert to Base64
        }

    return {
        trip_id: trip.trip_id,
        guide_id: trip.guide_id,
        first_name: guide.first_name,
        last_name: guide.last_name,
        average_rating: average_rating,
        phone_number: guide.phone_number,
        guide_image: gimage,
        name: lang === 'ar' ? trip.ar_name : trip.name,
        price: trip.price,
        starting_time: formattedDate,
        duration: differenceInHours,
        image: image
    };
}));

// Send the formatted results as the response
return res.status(200).json(formattedResults);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Search failed' });
    }
};
