const axios = require('axios');
require('dotenv').config();
exports.getCityFromCoords = async (lat, lon) => {
    const apiKey = 'YOUR_HERE_API_KEY';
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lon}&lang=en-US&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data && data.items && data.items.length > 0) {
            const result = data.items[0];
            const address = result.address;

            const potentialCityNames = [
                address.city,
                address.district,
                address.county,
                address.state,
                address.countryName
            ].filter(Boolean); // Remove undefined values

            return potentialCityNames;
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        console.error('Error during reverse geocoding:', error);
        throw error;
    }
};
