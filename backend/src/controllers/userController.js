const Joi = require('joi');
const mailer = require('../utils/mailer');
const { sequelize } = require('../../db/models');
const { User, Place, guide_rating, guide_rating_comment, place_rating, place_rating_comment, favorite_guides, favorite_places, Trip } = require('../../db/models');
const { QueryTypes, Op } = require('sequelize');
const upload = require('../utils/upload');
const fs = require('fs');
const path = require("node:path");
const { report } = require('process');
const { imageConvert } = require('../utils/base64Image');
const { type, platform } = require('os');
const {convertStringToNumber} = require('convert-string-to-number');
const Fuse = require('fuse.js');
require('dotenv').config();


exports.profile = async (req, res) => {

    try {
        
        const userId = req.params.user_id;
        const profileQuery = `SELECT 
    u.first_name,
    u.last_name,
    u.email,
    u.phone_number,
    p.image_path AS image
FROM
    users u
        LEFT JOIN
    profile_pics p ON u.user_id = p.user_id
WHERE
    u.user_id = ${userId}`;

    const profile = await sequelize.query(profileQuery);

    if(profile[0].length != 0){

        console.log(profile);
        const profileWimage = imageConvert(profile);
        
        return res.status(200).send(profile[0][0]);
    } else {
        return res.status(404).json({ message: "There are no guides in your favorites list." });
    }
    } catch (error) {
        if (error) {
            return res.status(500).json({ error: error, message: "Failed to fetch profile" });
        }
    }
}

exports.favoriteGuides = async (req, res) => {

    try {

        const userId = req.params.user_id;


        const favGuidesQuery = `SELECT 
    u.user_id AS id,
    u.first_name,
    u.last_name,
    (SELECT 
            EXISTS( SELECT 
                        1
                    FROM
                        favorite_guides fg
                    WHERE
                        fg.guide_id = u.user_id
                            AND fg.user_id = ${userId})
        ) AS isFavorite,
    p.image_path AS image,
    AVG(r.rate) AS average_rating
FROM
    trek.users u
        LEFT JOIN
    profile_pics p ON u.user_id = p.user_id
        LEFT JOIN
    guide_ratings r ON u.user_id = r.guide_id
WHERE
    u.role_id = 2 AND u.isVerified = TRUE
GROUP BY u.user_id , u.first_name , u.last_name , p.image_path
HAVING isFavorite = TRUE
    `;


    const guides = await sequelize.query(favGuidesQuery);

        if (guides[0].length != 0) {
            // Modify the guide data to include the image
            guidesWimages = imageConvert(guides);

            return res.status(200).send(guidesWimages[0]);
        } else {
            return res.status(404).json({ message: "There are no guides in your favorites list." });
        }

    } catch (error) {
        if (error) {
            return res.status(500).json({ error: error, message: "Failed to fetch guide" });
        }
    }

};



exports.favoritePlaces = async (req, res) => {

    try {

        const userId = req.params.user_id;

        const {lang} = req.params;
        let selectClause;
    if (lang === 'ar') {
        console.log('inside if lang');
        selectClause = `p.ar_name AS name,
    c.arabic_name AS city,`;
    }
    else {
        selectClause = `p.name,
    c.name AS city,`;
    }

        const favPlacesQuery = `SELECT 
    p.place_id,
    ${selectClause}
    AVG(r.rate) AS average_rating,
    (SELECT 
            EXISTS( SELECT 
                        1
                    FROM
                        favorite_places fp
                    WHERE
                        fp.place_id = p.place_id
                            AND fp.user_id = ${userId})
        ) AS isFavorite,
    p.active,
    (SELECT 
            image_path
        FROM
            place_images
        WHERE
            place_id = p.place_id
        LIMIT 1) AS image
FROM
    places p
        JOIN
    cities c ON p.city_id = c.city_id
        LEFT JOIN
    place_ratings r ON r.place_id = p.place_id
WHERE
    p.active = TRUE
GROUP BY p.place_id , p.name , c.name
HAVING isFavorite = TRUE
    `;


    const places = await sequelize.query(favPlacesQuery);

        if (places[0].length != 0) {
            // Modify the guide data to include the image
            placesWimages = imageConvert(places);

            return res.status(200).send(placesWimages[0]);
        } else {
            return res.status(404).json({ message: "There are no places in your favorites list." });
        }

    } catch (error) {
        if (error) {
            return res.status(500).json({ error: error, message: "Failed to fetch places" });
        }
    }

};

exports.guides = async (req, res) => {
    try {

        const byName = convertStringToNumber(req.params.byName);
        const userId = req.params.user_id;
        const orderClause = byName == true? `ORDER BY
        u.first_name, u.last_name` :
            `ORDER BY
        average_rating DESC`;

        const allGuidesQuery = `SELECT 
    u.user_id AS id,
    u.first_name,
    u.last_name,
    (SELECT 
            EXISTS( SELECT 
                        1
                    FROM
                        favorite_guides fg
                    WHERE
                        fg.guide_id = u.user_id
                            AND fg.user_id = ${userId})
        ) AS isFavorite,
    p.image_path AS image,
    AVG(r.rate) AS average_rating
FROM
    trek.users u
        LEFT JOIN
    profile_pics p ON u.user_id = p.user_id
        LEFT JOIN
    guide_ratings r ON u.user_id = r.guide_id
WHERE
    u.role_id = 2 AND u.isVerified = TRUE
GROUP BY u.user_id , u.first_name , u.last_name , p.image_path
    ${orderClause}
    `;
        const guides = await sequelize.query(allGuidesQuery);

        if (guides[0].length != 0) {
            // Modify the guide data to include the image
            guidesWimages = imageConvert(guides);

            return res.status(200).send(guidesWimages[0]);
        } else {
            return res.status(404).json({ message: "There are no guides registered in the system." });
        }
    } catch (error) {
        if (error) {
            return res.status(500).json({ error: error, message: "Failed to fetch guides" });
        }
    }
};

exports.guide = async (req, res) => {

    try {
        const id = req.params.id;

        const guideQuery = `SELECT 
    u.first_name,
    u.last_name,
    u.phone_number,
    p.image_path AS image,
    (SELECT AVG(rate) FROM guide_ratings WHERE guide_id = u.user_id) AS average_rating
FROM 
    trek.users u
LEFT JOIN 
    profile_pics p ON u.user_id = p.user_id
WHERE 
    u.user_id = :id AND u.role_id = 2`;
        const guide = await sequelize.query(guideQuery, {
            replacements: { id }
        });

        const tripsQuery = `SELECT * FROM trips WHERE guide_id = :id`;
        const trips = await sequelize.query(tripsQuery, { replacements: { id } });

        console.log(guide);
        if (guide[0][0].length != 0) {
            // image_path is a relative path from the 'public' directory 
            guidesWimage = imageConvert(guide);

            return res.status(200).send(guidesWimage[0][0]);

            //guide[0][0].trips = trips[0];

            //return res.status(200).send(guide[0][0]);
        } else {
            return res.status(404).json({ message: "There is no guide with such id" });
        }
    } catch (error) {
        if (error) {
            return res.status(500).json({ error: error, message: "Failed to fetch guide" });
        }
    }
};


exports.guideComments = async (req, res) => {
    try {
        const id = req.params.id;
        const commentsQuery = `SELECT 
    u.user_id,
    CONCAT(u.first_name, ' ', u.last_name) AS name,
    gr.rate,
    gc.comment,
    CASE 
        WHEN TIMESTAMPDIFF(MINUTE, gc.createdAt, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, gc.createdAt, NOW()), ' minutes ago')
        WHEN TIMESTAMPDIFF(HOUR, gc.createdAt, NOW()) = 1 THEN CONCAT(TIMESTAMPDIFF(HOUR, gc.createdAt, NOW()), ' hour ago')
        WHEN TIMESTAMPDIFF(HOUR, gc.createdAt, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, gc.createdAt, NOW()), ' hours ago')
        WHEN TIMESTAMPDIFF(DAY, gc.createdAt, NOW()) = 1 THEN CONCAT(TIMESTAMPDIFF(DAY, gc.createdAt, NOW()), ' day ago')
        WHEN TIMESTAMPDIFF(DAY, gc.createdAt, NOW()) <= 7 THEN CONCAT(TIMESTAMPDIFF(DAY, gc.createdAt, NOW()), ' days ago')
        WHEN TIMESTAMPDIFF(DAY, gc.createdAt, NOW()) = 7 THEN CONCAT(FLOOR(TIMESTAMPDIFF(DAY, gc.createdAt, NOW()) / 7), ' week ago')
        WHEN TIMESTAMPDIFF(DAY, gc.createdAt, NOW()) <= 30 THEN CONCAT(FLOOR(TIMESTAMPDIFF(DAY, gc.createdAt, NOW()) / 7), ' weeks ago')
        ELSE DATE_FORMAT(gc.createdAt, '%Y-%m-%d')
    END AS time,
    up.image_path AS image
FROM
    guide_ratings gr
        JOIN
    guide_rating_comments gc ON gr.guide_rating_id = gc.rate_id
        JOIN
    users u ON gr.user_id = u.user_id
        LEFT JOIN
    profile_pics up ON up.user_id = u.user_id
WHERE
    gr.guide_id = ${id};`;

        const comments = await sequelize.query(commentsQuery);

        if (comments[0].length != 0) {
            const commentWimages = imageConvert(comments);

            return res.status(200).send(commentWimages[0]);
        }
        return res.status(404).json({ message: 'no comments found' });

    } catch (error) {
        console.error('Failed to fetch guide comments:', error);
        return res.status(500).json({ error: 'Failed to fetch guide comments' });
    }
};


const guideRateSchema = Joi.object({
    user_id: Joi.number().required(),
    guide_id: Joi.number().required(),
    rate: Joi.number().required(),
    comment: Joi.string().optional()
});

exports.addGuideRate = async (req, res) => {
    try {
        const { error } = guideRateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { user_id, guide_id, rate, comment } = req.body;


        const guide = await User.findByPk(guide_id);
        if(!guide){
            return res.satatus(404).json({message: 'guide not found'});
        }

        const bookedBefore = await sequelize.query(`SELECT 
    b.trip_id, t.guide_id, b.user_id
FROM
    booked_trips b
        LEFT JOIN
    trips t ON b.trip_id = t.trip_id
WHERE
    t.guide_id = ${guide_id} AND b.user_id = ${user_id};`, {type: QueryTypes.SELECT});

    if(!bookedBefore){
        return res.status(400).jsno({message: 'cannot rate a guide with no prior experience'});
    }
        const rateInstance = await guide_rating.create({
            user_id,
            guide_id,
            rate
        });

        if(comment){
            const commentInstance = await guide_rating_comment.create({
                rate_id: rateInstance.guide_rating_id,
                comment: comment 
            });
        }

        return res.status(201).json({message: 'rate added successfully!'});
    } catch (error) {
        console.error('Failed to add guide rate:', error);
        return res.status(500).json({ error: 'Failed to add guide rate' });
    }
};

const placeRateSchema = Joi.object({
    user_id: Joi.number().required(),
    place_id: Joi.number().required(),
    rate: Joi.number().required(),
    comment: Joi.string().optional()
});
exports.addPlaceRate = async (req, res) => {
    try {
        const { error } = placeRateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { user_id, place_id, rate, comment } = req.body;


        const place = await Place.findByPk(place_id);
        if(!place){
            return res.satatus(404).json({message: 'place not found'});
        }

        const bookedBefore = await sequelize.query(`SELECT 
    b.trip_id, tp.place_id, b.user_id
FROM
    booked_trips b
        LEFT JOIN
    trips t ON b.trip_id = t.trip_id
        LEFT JOIN
    trip_paths tp ON tp.trip_id = t.trip_id
WHERE
    tp.place_id = ${place_id} AND b.user_id = ${user_id};`, {type: QueryTypes.SELECT});

    if(!bookedBefore){
        return res.status(400).jsno({message: 'cannot rate a guide with no prior experience'});
    }
        const rateInstance = await place_rating.create({
            user_id,
            place_id,
            rate
        });

        console.log(rateInstance.dataValues.rate_id);

        if(comment){
            const commentInstance = await place_rating_comment.create({
                rate_id: rateInstance.dataValues.rate_id,
                comment: comment 
            });
        }

        return res.status(201).json({message: 'rate added successfully!'});
    } catch (error) {
        console.error('Failed to add place rate:', error);
        return res.status(500).json({ error: 'Failed to add place rate' });
    }
};

const guideFavSchema = Joi.object({
    user_id: Joi.number().required(),
    guide_id: Joi.number().required()
});

exports.favGuide = async (req, res) => {
    try {
        const { error } = guideFavSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { user_id, guide_id } = req.body;

        const guide = await User.findByPk(guide_id);
        if(!guide){
            return res.satatus(404).json({message: 'guide not found'});
        }

        const favExists = await favorite_guides.findOne({where: {user_id, guide_id}});

        if(favExists){
            favExists.destroy();
            await favExists.save();
            return res.status(204).json({message: 'guide removed from favorites successfully'});
        }

        await favorite_guides.create({
            user_id: user_id,
            guide_id: guide_id
        });
        return res.status(200).json({message: 'guide added to favorites successfully!!'});
    } catch (error) {
        console.error('Failed to add guide to favorites:', error);
        return res.status(500).json({ error: 'Failed to add guide to favorites' });
    }
};


const placeFavSchema = Joi.object({
    user_id: Joi.number().required(),
    place_id: Joi.number().required()
});

exports.favPlace = async (req, res) => {
    try {
        const { error } = placeFavSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { user_id, place_id } = req.body;

        const place = await Place.findByPk(place_id);
        if(!place){
            return res.satatus(404).json({message: 'place not found'});
        }
        const favExists = await favorite_places.findOne({where: {user_id, place_id}});

        if(favExists){
            favExists.destroy();
            await favExists.save();
            return res.status(204).json({message: 'place removed from favorites successfully'});
        }

        await favorite_places.create({
            user_id: user_id,
            place_id: place_id
        });
        return res.status(200).json({message: 'place added to favorites successfully!!'});
    } catch (error) {
        console.error('Failed to add place to favorites:', error);
        return res.status(500).json({ error: 'Failed to add place to favorites' });
    }
};