const Joi = require('joi');
const { sequelize, City, Category, Place, PlaceImage, Sequelize, trip_path } = require('../../db/models');
const { QueryTypes, where } = require('sequelize');
const upload = require('../utils/upload');
const placeUpload = upload('places');
const placeMiddleware = require('../middlewares/placeMiddleware');
const { imageConvert } = require('../utils/base64Image');
const path = require("path");
const fs = require("fs");
const translate = require('translate-google');

const { convertStringToNumber } = require('convert-string-to-number');
const { la } = require('translate-google/languages');
require('dotenv').config();


const placeSchema = Joi.object({
    city: Joi.string().required(),
    category: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.string().uri().required()
});


exports.addPlace = async (req, res) => {
    placeUpload.array('placeImages', 10)(req, res, async (err) => {
        console.log(req.body);
        if (err) {
            console.error('Error uploading images:', err);
            return res.status(400).json({ error: 'Images upload failed' });
        }


        try {

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'Must upload at least one image' });
            }
            const { error } = placeSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const { city, category, name, description, address, location } = req.body;

            // Translate fields to Arabic
            let translatedName = 'اسم عربي'/* await translate(name, {from: 'en', to:'ar'}) */;
            let translatedDescription = 'وصف عربي'/* await translate(description,{from: 'en', to:'ar'}) */;
            let translatedAddress = 'عنوان عربي' /*  await translate(address, {from: 'en', to:'ar'}) */;

            translatedName = await translate(name, { to: 'ar' });
            translatedDescription = await translate(description, { to: 'ar' });
            translatedAddress = await translate(address, { to: 'ar' });

            const cityQuery = `SELECT city_id, name, arabic_name, ST_X(location) as longitude, ST_Y(location) as latitude FROM cities AS City WHERE City.name = '${city}' LIMIT 1`;
            const cityObj = await sequelize.query(cityQuery, { type: QueryTypes.SELECT });

            const coords = await placeMiddleware.extractCoordinates(location);
            if (!cityObj) {
                return res.status(400).json({ message: 'Invalid city specified' });
            }

            console.log(cityObj[0].arabic_name);
            const isValid = await placeMiddleware.validateCityFromCoords(location, cityObj[0].arabic_name);

            if (!isValid) {
                return res.status(400).json({ message: 'The provided coordinates do not match the specified city or nearby cities' });
            }

            let catObj = await Category.findOne({ where: { name: category } });

            if (!cityObj || !catObj) {
                return res.status(400).json({ message: 'Invalid city or category' });
            }

            const cityId = cityObj[0].city_id;
            const catId = catObj.category_id;

            // Check if place already exists
            let placeExists = await Place.findOne({ where: { city_id: cityId, category_id: catId, name: name } });
            if (placeExists) {
                return res.status(400).json({ message: 'Place with this name, city, and category already exists' });
            }

            // Create new place
            const place = await Place.create({
                city_id: cityId,
                category_id: catId,
                name,
                description,
                address,
                ar_name: translatedName, // Assign translated name
                ar_description: translatedDescription, // Assign translated description
                ar_address: translatedAddress, // Assign translated address
                location: Sequelize.literal(`ST_GeomFromText('POINT(${coords.lng} ${coords.lat})')`)
            });

            const placeId = place.place_id;

            // Process and store images
            const placeImages = req.files;

            if (placeImages && placeImages.length > 0) {
                for (const image of placeImages) {
                    const relativePath = path.relative('public/places', image.path);
                    await PlaceImage.create({
                        place_id: placeId,
                        image_path: relativePath
                    });
                }
            }

            return res.status(201).json({ message: 'Place created successfully' });

        } catch (error) {
            console.error('Failed to create new place:', error);
            return res.status(500).json({ error: 'Failed to create place' });
        }
    });
};

exports.userPlaces = async (req, res) => {
    try {
        const user_id = req.params.userId;
        const city_id = req.params.cityId;
        const cat_id = req.params.catId;

        const { lang } = req.params;
        console.log(`language is ${lang}`);
        const places = await placeMiddleware.allPlaces(user_id, city_id, cat_id, 3, lang);

        if (places.length != 0) {
            console.log('\n\n\nplaces', places)
            return res.status(200).send(places);
        }
        return res.status(404).json({ message: 'no places found' });
    } catch (error) {
        console.error('Failed to fetch places:', error);
        return res.status(500).json({ error: 'Failed to fetch places' });
    }
}

exports.guidePlaces = async (req, res) => {
    try {
        const city_id = req.params.cityId;
        const cat_id = req.params.catId;

        const { lang } = req.params;
        const places = await placeMiddleware.allPlaces(0, city_id, cat_id, 2, lang);

        if (places.length != 0) {
            console.log('\n\n\nplaces', places)
            return res.status(200).send(places);
        }
        return res.status(404).json({ message: 'no places found' });
    } catch (error) {
        console.error('Failed to fetch places:', error);
        return res.status(500).json({ error: 'Failed to fetch places' });
    }
}

exports.adminPlaces = async (req, res) => {
    try {
        const city_id = req.params.cityId;
        const cat_id = req.params.catId;

        const { lang } = req.params;
        const places = await placeMiddleware.allPlaces(0, city_id, cat_id, 1, lang);

        if (places.length != 0) {
            console.log('\n\n\nplaces', places)
            return res.status(200).send(places);
        }
        return res.status(404).json({ message: 'no places found' });
    } catch (error) {
        console.error('Failed to fetch places:', error);
        return res.status(500).json({ error: 'Failed to fetch places' });
    }
}


exports.place = async (req, res) => {

    try {
        const id = req.params.id;

        const { lang } = req.params;

        let selectClause;
        if (lang === 'ar') {
            console.log('inside if lang');
            selectClause = `p.ar_name AS 'name', 
    c.arabic_name AS 'city',
    p.ar_description AS description, 
    p.ar_address AS address, `;
        }
        else {
            selectClause = `p.name, 
    c.name AS city,
    p.description,
    p.address,
     `
        }
        const placeQuery = `SELECT 
        p.place_id, 
        ${selectClause}
        AVG(r.rate) AS average_rating,
        
        (SELECT COUNT(pc.comment) AS count FROM place_rating_comments pc JOIN place_ratings pr ON pc.rate_id=pr.rate_id WHERE pr.place_id=${id}) AS comment_count
    FROM 
        places p
    JOIN 
        cities c ON p.city_id = c.city_id
    LEFT JOIN 
        place_ratings r ON r.place_id = p.place_id 
    WHERE
        p.place_id=${id}
    GROUP BY 
        p.place_id, 
        p.name, 
        c.name`;

        const placeResult = await sequelize.query(placeQuery);

        if (placeResult[0].length !== 0) {
            return res.status(200).send(placeResult[0][0]);
        }
        return res.status(404).json({ message: 'no such place' });
    } catch (error) {
        console.error('Failed to fetch place details:', error);
        return res.status(500).json({ error: 'Failed to fetch place details' });
    }
};

exports.placeComments = async (req, res) => {
    try {
        const id = req.params.id;
        const commentsQuery = `SELECT 
    u.user_id,
    CONCAT(u.first_name, ' ', u.last_name) AS name,
    pr.rate,
    pc.comment,
    CASE 
        WHEN TIMESTAMPDIFF(MINUTE, pc.createdAt, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, pc.createdAt, NOW()), ' minutes ago')
        WHEN TIMESTAMPDIFF(HOUR, pc.createdAt, NOW()) = 1 THEN CONCAT(TIMESTAMPDIFF(HOUR, pc.createdAt, NOW()), ' hour ago')
        WHEN TIMESTAMPDIFF(HOUR, pc.createdAt, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, pc.createdAt, NOW()), ' hours ago')
        WHEN TIMESTAMPDIFF(DAY, pc.createdAt, NOW()) = 1 THEN CONCAT(TIMESTAMPDIFF(DAY, pc.createdAt, NOW()), ' day ago')
        WHEN TIMESTAMPDIFF(DAY, pc.createdAt, NOW()) <= 7 THEN CONCAT(TIMESTAMPDIFF(DAY, pc.createdAt, NOW()), ' days ago')
        WHEN TIMESTAMPDIFF(DAY, pc.createdAt, NOW()) = 7 THEN CONCAT(FLOOR(TIMESTAMPDIFF(DAY, pc.createdAt, NOW()) / 7), ' week ago')
        WHEN TIMESTAMPDIFF(DAY, pc.createdAt, NOW()) <= 30 THEN CONCAT(FLOOR(TIMESTAMPDIFF(DAY, pc.createdAt, NOW()) / 7), ' weeks ago')
        ELSE DATE_FORMAT(pc.createdAt, '%Y-%m-%d')
    END AS time,
    up.image_path AS image
FROM
    place_ratings pr
        JOIN
    place_rating_comments pc ON pr.rate_id = pc.rate_id
        JOIN
    users u ON pr.user_id = u.user_id
        LEFT JOIN
    profile_pics up ON up.user_id = u.user_id
WHERE
    pr.place_id = ${id}`;

        const comments = await sequelize.query(commentsQuery);

        if (comments[0].length != 0) {
            const commentWimages = imageConvert(comments);

            return res.status(200).send(commentWimages[0]);
        }
        return res.status(404).json({ message: 'no comments found' });

    } catch (error) {
        console.error('Failed to fetch place details:', error);
        return res.status(500).json({ error: 'Failed to fetch place details' });
    }
};

exports.placeImages = async (req, res) => {
    try {
        const id = req.params.id;
        const placeImagesQuery = `SELECT image_id, image_path AS image FROM place_images WHERE place_id = ${id}`;
        const imagesResult = await sequelize.query(placeImagesQuery);

        const images = imageConvert(imagesResult);

        return res.status(200).send(images[0]);
    } catch (error) {
        console.error('Failed to fetch place images:', error);
        return res.status(500).json({ error: 'Failed to fetch place images' });
    }
};



exports.placesList = async (req, res) => {
    try {

        const { lang } = req.params;
        let places;

        if (lang == 'ar') {

            places = await Place.findAll({
                attributes: [['ar_name', 'name']],
                where: { active: true }
            });
        } else {

            places = await Place.findAll({
                attributes: ['name'],
                where: { active: true }
            });
        }

        if (!places) {
            return res.status(404).json({ message: 'no places found' });
        }
        // Extract names into an array
        const placeNames = places.map(place => place.name);

        return res.status(200).json(placeNames);
    } catch (error) {
        console.error('Failed to fetch places:', error);
        return res.status(500).json({ error: 'Failed to fetch places' });
    }
};

exports.citiesList = async (req, res) => {
    try {
        const { lang } = req.params;
        let cities = lang !== 'ar' ? await City.findAll({
            attributes: ['city_id', 'name'],
        }) : await City.findAll({
            attributes: ['city_id', ['arabic_name', 'name']],
        });


        if (!cities) {
            return res.status(404).json({ message: 'no cities found' });
        }
        // Extract names into an array
        const cityNames = cities.map(city => city.name);

        return res.status(200).json(cities);
    } catch (error) {
        console.error('Failed to fetch places:', error);
        return res.status(500).json({ error: 'Failed to fetch places' });
    }
};

exports.categoriesList = async (req, res) => {
    try {
        const lang = req.params.lang;
        const categories = lang !== 'ar' ? await Category.findAll({
            attributes: ['category_id', 'name'],
        }) : await Category.findAll({
            attributes: ['category_id', ['arabic_name', 'name']],
        });


        if (!categories) {
            return res.status(404).json({ message: 'no cities found' });
        }
        // Extract names into an array
        const categoryNames = categories.map(category => category.name);

        return res.status(200).json(categories);
    } catch (error) {
        console.error('Failed to fetch places:', error);
        return res.status(500).json({ error: 'Failed to fetch places' });
    }
};

exports.isActive = async (req, res) => {
    try {
        const { place_id } = req.params;

        const place = await Place.findByPk(place_id);

        if (!place) {
            return res.status(404).json({ message: 'place not found' });
        }

        if (place.active == true) {
            return res.status(200).json({ message: 'active' });
        } else {
            return res.status(200).json({ message: 'inactive' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch places' });
    }
}

const activePlaceSchema = Joi.object({
    place_id: Joi.number().required()
});


exports.activatePlace = async (req, res) => {
    try {
        // Validate request body against schema
        const { error } = activePlaceSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { place_id } = req.body;

        // Find the place by its primary key
        const place = await Place.findByPk(place_id);

        // Check if the place exists
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }

        // If the place is active, check if it can be deactivated
        if (place.active === true) {
            const tripWithPlace = await trip_path.findOne({ where: { place_id } });

            if (tripWithPlace) {
                return res.status(400).json({ error: 'There are trips booked in this place' });
            }

            // Deactivate the place
            place.active = false;
            await place.save(); // Save the changes to the database

            return res.status(200).json({ message: 'Deactivated successfully' });
        }

        // Activate the place
        place.active = true;
        await place.save(); // Save the changes to the database

        return res.status(200).json({ message: 'Activated successfully' });

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({ error: 'Failed to activate place' });
    }
};


exports.editablePlace = async (req, res) => {

    try {
        const id = req.params.id;

        const placeQuery = `SELECT 
    p.place_id,
    p.name,
    p.description,
    p.address,
    p.location,
    c.name AS city,
    ct.name AS category
FROM
    places p
        JOIN
    cities c ON p.city_id = c.city_id
        JOIN
    categories ct ON ct.category_id = p.category_id
        LEFT JOIN
    place_ratings r ON r.place_id = p.place_id
WHERE
    p.place_id = ${id}
GROUP BY p.place_id , p.name , c.name`;

        const placeResult = await sequelize.query(placeQuery);

        if (placeResult[0].length !== 0) {
            const placeData = placeResult[0][0];
            // Extract coordinates
            placeData.coordinates = placeData.location.coordinates; // Add coordinates directly
            // Remove the location object (optional)
            delete placeData.location;

            return res.status(200).send(placeData);
        }
        return res.status(404).json({ message: 'no such place' });
    } catch (error) {
        console.error('Failed to fetch place details:', error);
        return res.status(500).json({ error: 'Failed to fetch place details' });
    }
};


exports.deletePlaceImages = async (req, res) => {
    // Joi validation schema
    const schema = Joi.object({
        image_ids: Joi.array().items(Joi.number().integer().required()).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { image_ids } = req.body;

    try {
        for (const image_id of image_ids) {
            const image = await PlaceImage.findByPk(image_id);

            console.log(image);
            if (!image) {
                return res.status(404).json({ error: `Image with id ${image_id} not found` });
            }

            // Delete the image file from the filesystem
            const imagePath = path.join(__dirname, image.image_path);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            // Delete the image record from the database
            await image.destroy();
        }

        return res.status(200).json({ message: 'Images deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete images' });
    }
};

exports.uploadPlaceImages = async (req, res) => {

    console.log(req.files);
    placeUpload.array('placeImages', 10)(req, res, async (err) => {
        console.log(req.body);
        if (err) {
            console.error('Error uploading images:', err);
            return res.status(400).json({ error: 'Images upload failed' });
        }
        const { place_id } = req.body;

        if (!req.files) {
            return res.status(400).json({ error: 'images required' });
        }
        if (!place_id) {
            return res.status(400).json({ error: 'Place ID is required' });
        }

        try {

            const placeId = convertStringToNumber(place_id);
            // Process and store images
            const placeImages = req.files;

            if (placeImages && placeImages.length > 0) {
                for (const image of placeImages) {
                    const relativePath = path.relative('public/places', image.path);
                    await PlaceImage.create({
                        place_id: placeId,
                        image_path: relativePath
                    });
                }
            }

            return res.status(200).json({ message: 'Images uploaded successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to upload images' });
        }
    });
};

exports.editPlaceDetails = async (req, res) => {
    // Joi validation schema
    const schema = Joi.object({
        place_id: Joi.number().integer().required(),
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        address: Joi.string().optional()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { place_id, name, description, address } = req.body;

    try {
        const place = await Place.findByPk(place_id);

        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }

        place.name = name || place.name;
        place.description = description || place.description;

        place.ar_name = name ? await translate(name, { to: 'ar' }) : place.ar_name;
        place.ar_description = description ? await translate(description, { to: 'ar' }) : place.ar_description;
        place.ar_address = address ? await translate(address, { to: 'ar' }) : place.ar_address;

        await place.save();

        return res.status(200).json({ message: 'Place details updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update place details' });
    }
};