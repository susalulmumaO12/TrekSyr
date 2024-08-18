const Joi = require('joi');
const { sequelize, City, Category, Place, PlaceImage, favorite_places } = require('../../db/models');
const upload = require('../utils/upload');
const { imageConvert } = require('../utils/base64Image');
const axios = require('axios');
const url = require('url');
const turf = require('turf/turf');
const { booleanPointInPolygon } = require('@turf/boolean-point-in-polygon');
require('dotenv').config();

exports.extractCoordinates = async (mapUrl) => {
    try {
        // Handle shortened URLs
        if (mapUrl.includes('maps.app.goo.gl')) {
            const response = await axios.get(mapUrl);
            mapUrl = response.request.res.responseUrl;
        }

        const parsedUrl = url.parse(mapUrl, true);

        // Handle Google Maps Place URL
        if (parsedUrl.pathname.startsWith('/maps/place')) {
            const match = parsedUrl.pathname.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
            if (match) {
                const [, lat, lng] = match;
                return { lat: parseFloat(lat), lng: parseFloat(lng) };
            }
        }

        // Handle Google Maps Coordinate URL
        if (parsedUrl.query.q) {
            const [lat, lng] = parsedUrl.query.q.split(',');
            return { lat: parseFloat(lat), lng: parseFloat(lng) };
        }

        throw new Error('Could not extract coordinates from URL');
    } catch (error) {
        console.error('Error extracting coordinates:', error);
        throw error;
    }
}

async function getCityBoundary(cityName) {
    try {
        console.log(cityName);
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`);

        console.log(response.data);
        if (response.data && response.data.length > 0) {
            const place = response.data[0];
            if (place.boundingbox && place.boundingbox.length === 4) {
                const coordinates = [
                    [parseFloat(place.boundingbox[2]), parseFloat(place.boundingbox[0])], // bottom-right (lon, lat)
                    [parseFloat(place.boundingbox[2]), parseFloat(place.boundingbox[1])], // top-right (lon, lat)
                    [parseFloat(place.boundingbox[3]), parseFloat(place.boundingbox[1])], // top-left (lon, lat)
                    [parseFloat(place.boundingbox[3]), parseFloat(place.boundingbox[0])],  // bottom-left (lon, lat)
                    [parseFloat(place.boundingbox[2]), parseFloat(place.boundingbox[0])]  // back to bottom-right to close the polygon
                ];
                return coordinates;
            }
        }
        return null; // Return null if no valid bounding box found
    } catch (error) {
        console.error('Error fetching city boundary:', error);
        return null;
    }
};

/*  // Example usage
 const cityName = 'حلب';
 getCityBoundary(cityName)
   .then(coordinates => {
     if (coordinates) {
       console.log(`Boundary coordinates for ${cityName}:`, coordinates);
       // Perform point-in-polygon check using coordinates and point
       // Example: checkPointInPolygon(coordinates, point);
     } else {
       console.log(`No boundary found for ${cityName}`);
     }
   })
   .catch(error => {
     console.error('Error:', error);
   }); */

function isPointInPolygon(pointCoordinates, polygonCoordinates) {
    const point = turf.point(pointCoordinates);
    const polygon = turf.polygon([polygonCoordinates]);
    return booleanPointInPolygon(point, polygon);
}

exports.validateCityFromCoords = async (mapUrl, cityName) => {
    try {
        // Extract coordinates from map URL
        const placeCoords = await this.extractCoordinates(mapUrl);

        let city = cityName + ` سوريا`;
        // Get city boundary
        let cityBoundary = await getCityBoundary(city);

        // Check if place is within city boundary
        let isInside = isPointInPolygon([placeCoords.lng, placeCoords.lat], cityBoundary);

        if (!isInside) {
            city = `ريف ${cityName}`;
            cityBoundary = await getCityBoundary(city);
            isInside = isPointInPolygon([placeCoords.lng, placeCoords.lat], cityBoundary);
            if (!isInside) {
                return false;
            }
            else return true;
        }
        return true;
    } catch (error) {
        console.error('Error validating city from coordinates, specified location does not belong to the selected city:', error);
    }
};

exports.allPlaces = async (userId, cityId, categoryId, role, lang) => {

    let whereClause;
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based, so add 1
    const currentSeason = getSeason(currentMonth);
    let places;


    console.log(`language 222is ${lang}`);
    let selectClause;
    if (lang === 'ar') {
        console.log('inside if lang');
        selectClause = `p.ar_name AS name, 
    c.arabic_name AS city, `;
    }
    else {
        selectClause = `p.name, 
    c.name AS city, `
    }
    let favoriteClause = role == 3 ? `(SELECT EXISTS(SELECT 1 FROM favorite_places fp WHERE fp.place_id = p.place_id AND fp.user_id = ${userId})) AS isFavorite,`
        : ``;
    let userWhere = role != 1 ? `AND p.active = TRUE` : ``;
    let activeClause = role == 1 ? `p.active,` : ``;

    if (cityId == 0) {
        if (categoryId == 0) { //no city no category
            places = await allPopular(userId, currentSeason, role, lang);
            return places;
        } else { //no city yes category
            whereClause = `WHERE 
                            p.category_id = ${categoryId}
                            ${userWhere}`;
        }
    } else {
        if (categoryId == 0) { //yes city no category
            places = await cityPopular(userId, cityId, currentSeason, role, lang);
            return places;
        } else { //yes city yes category
            whereClause = `WHERE 
                            p.city_id = ${cityId}
                            AND p.category_id = ${categoryId}
                            ${userWhere}`;
        }
    }

    const placesQuery = `SELECT 
    p.place_id, 
    ${selectClause}
    AVG(r.rate) AS average_rating,
    ${favoriteClause}
    ${activeClause}
    (SELECT image_path FROM place_images WHERE place_id = p.place_id LIMIT 1) AS image
FROM 
    places p
JOIN 
    cities c ON p.city_id = c.city_id
LEFT JOIN 
    place_ratings r ON r.place_id = p.place_id 
${whereClause}
GROUP BY 
    p.place_id, 
    ${lang === 'ar' ? 'p.ar_name, c.arabic_name' : 'p.name, c.name'}
`;

    places = await sequelize.query(placesQuery);


    placesWimages = imageConvert(places);

    return placesWimages[0];
};

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getSeason = (month) => {
    if ([12, 1, 2].includes(month)) return 'winter';
    if ([3, 4, 5].includes(month)) return 'spring';
    if ([6, 7, 8].includes(month)) return 'summer';
    if ([9, 10, 11].includes(month)) return 'autumn';
};

const alwaysSuggestedCategories = [5, 6, 7]; // Restaurants, Hotels, and Transportation
const seasonalCategories = {
    'winter': [3, 4],
    'spring': [1, 3, 4],
    'summer': [1, 2, 3, 4],
    'autumn': [1, 3, 4]
};

const allPopular = async (userId, currentSeason, role, lang) => {

    let selectClause;
    if (lang === 'ar') {
        console.log('inside if lang');
        selectClause = `p.ar_name AS name, 
    c.arabic_name AS city, `;
    }
    else {
        selectClause = `p.name, 
    c.name AS city, `
    }

    let favoriteClause = role == 3 ?
        `(SELECT EXISTS(SELECT 1 FROM favorite_places fp WHERE fp.place_id = p.place_id AND fp.user_id = ${userId})) AS isFavorite,`
        : ``;
    let userWhere = role != 1 ? `AND p.active = TRUE` : ``;
    let activeClause = role == 1 ? `p.active,` : ``;
    const popularCategories = seasonalCategories[currentSeason].concat(alwaysSuggestedCategories);
    const placesQuery = `SELECT 
        p.place_id, 
        ${selectClause}
        AVG(r.rate) AS average_rating,
        ${favoriteClause}
        ${activeClause}
        (SELECT image_path FROM place_images WHERE place_id = p.place_id LIMIT 1) AS image 
    FROM 
        places p
    JOIN 
        cities c ON p.city_id = c.city_id
    LEFT JOIN 
        place_ratings r ON r.place_id = p.place_id
    WHERE 
        p.category_id IN (${popularCategories.join(',')})
        ${userWhere}
    GROUP BY 
        p.place_id, 
        p.name, 
        c.name
        HAVING average_rating > 3.5;
    `;

    let places = await sequelize.query(placesQuery);


    placesWimages = imageConvert(places);

    return placesWimages[0];
};

const cityPopular = async (userId, cityId, currentSeason, role, lang) => {
    let selectClause;
    if (lang === 'ar') {
        console.log('inside if lang');
        selectClause = `p.ar_name AS name, 
    c.arabic_name AS city, `;
    }
    else {
        selectClause = `p.name, 
    c.name AS city, `
    }

    let favoriteClause = role == 3 ?
        `(SELECT EXISTS(SELECT 1 FROM favorite_places fp WHERE fp.place_id = p.place_id AND fp.user_id = ${userId})) AS isFavorite,`
        : ``;
    let userWhere = role != 1 ? `AND p.active = TRUE` : ``;
    let activeClause = role == 1 ? `p.active,` : ``;
    const popularCategories = seasonalCategories[currentSeason].concat(alwaysSuggestedCategories);
    const placesQuery = `SELECT 
        p.place_id, 
        ${selectClause}
        AVG(r.rate) AS average_rating,
        ${favoriteClause}
        ${activeClause}
        (SELECT image_path FROM place_images WHERE place_id = p.place_id LIMIT 1) AS image
    FROM 
        places p
    JOIN 
        cities c ON p.city_id = c.city_id
    LEFT JOIN 
        place_ratings r ON r.place_id = p.place_id
    WHERE 
        p.city_id = ${cityId}
        AND p.category_id IN (${popularCategories.join(',')})
        ${userWhere}
    GROUP BY 
        p.place_id, 
        p.name, 
        c.name;
    `;

    let places = await sequelize.query(placesQuery);

    placesWimages = imageConvert(places);

    return placesWimages[0];
};