const Joi = require('joi');
const { Op } = require('sequelize');
const { Place, sequelize, Trip } = require('../../db/models');

const placeSchema = Joi.object({
    place_name: Joi.string().required(),
    time: Joi.date().required()
});

const tripSchema = Joi.object({
    guide_id: Joi.number().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    info: Joi.string().required(),
    starting_time: Joi.date().required(),
    ending_time: Joi.date().required(),
    gathering_place: Joi.string().required(),
    capacity: Joi.number().required(),
    closing_date: Joi.date().required(),
    places: Joi.array().items(placeSchema).required()
});

exports.validateTrip = async (req, res, next) => {
  try {
    const { error } = tripSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: `Validation error: ${error.details[0].message}` });
    }

    const { guide_id, starting_time, ending_time, closing_date, places } = req.body;
    const currentDate = new Date();

    // Check if there are any overlapping trips
    const overlappingTrips = await Trip.findOne({
      where: {
        guide_id: guide_id,
        [Op.or]: [
          {
            starting_time: {
              [Op.between]: [starting_time, ending_time]
            }
          },
          {
            ending_time: {
              [Op.between]: [starting_time, ending_time]
            }
          },
          {
            [Op.and]: [
              {
                starting_time: {
                  [Op.lte]: starting_time
                }
              },
              {
                ending_time: {
                  [Op.gte]: ending_time
                }
              }
            ]
          }
        ]
      }
    });

    if (overlappingTrips) {
      return res.status(400).json({ message: 'You already have a trip planned within the same date range' });
    }

    // Check if any dates are in the past
    if (new Date(starting_time) < currentDate || new Date(ending_time) < currentDate || new Date(closing_date) < currentDate) {
      return res.status(400).json({ error: 'Dates cannot be in the past' });
    }

    // Check date range logic
    if (new Date(starting_time) >= new Date(ending_time)) {
      return res.status(400).json({ error: 'Starting time must be before ending time' });
    }
    if (new Date(closing_date) >= new Date(starting_time)) {
      return res.status(400).json({ error: 'Closing date must be before starting time' });
    }

    // Check if place dates are within the trip range
    for (let place of places) {
      if (new Date(place.time) < new Date(starting_time) || new Date(place.time) > new Date(ending_time)) {
        return res.status(400).json({ error: `Place date ${place.place_name} at ${place.time} is out of the trip date range` });
      }
    }

    // Fetch place records to ensure all places exist
    const placeNames = places.map(place => place.place_name);
    const placeRecords = await Place.findAll({
      where: {
        name: {
          [Op.in]: placeNames
        }
      }
    });

    const foundPlaceNames = placeRecords.map(record => record.name);
    const notFoundPlaceNames = placeNames.filter(name => !foundPlaceNames.includes(name));

    if (notFoundPlaceNames.length > 0) {
      return res.status(400).json({
        error: 'One or more places not found',
        details: `The following places were not found: ${notFoundPlaceNames.join(', ')}. Please check for typos and try again.`
      });
    }

    // Attach validated and sorted places to the request object
    req.validatedPlaces = places.sort((a, b) => new Date(a.time) - new Date(b.time));
    req.placeRecords = placeRecords;

    next();
  } catch (error) {
    console.error('Failed to validate trip:', error);
    return res.status(500).json({ error: `Internal server error: ${error.message}`, message: 'Failed to validate trip' });
  }
};


const placeEditSchema = Joi.object({
  trip_path_id: Joi.number(),
  place_name: Joi.string(),
  time: Joi.date()
});

const tripEditSchema = Joi.object({
  trip_id: Joi.number(),
  name: Joi.string().optional(),
  price: Joi.number().optional(),
  info: Joi.string().optional(),
  starting_time: Joi.date().optional(),
  ending_time: Joi.date().optional(),
  gathering_place: Joi.string().optional(),
  capacity: Joi.number().optional(),
  closing_date: Joi.date().required().optional(),
  places: Joi.array().items(placeEditSchema).optional()
});

exports.validateEditTrip = async (req, res, next) => {
try {
  const { error } = tripEditSchema.validate(req.body );
  if (error) {
    return res.status(400).json({ error: `Validation error: ${error.details[0].message}` });
  }

  const { trip_id, starting_time, ending_time, closing_date, places } = req.body;
  const currentDate = new Date();
  if (starting_time && new Date(starting_time) < currentDate) {
    return res.status(400).json({ error: 'Starting time cannot be in the past' });
  }
  if (ending_time && new Date(ending_time) < currentDate) {
    return res.status(400).json({ error: 'Ending time cannot be in the past' });
  }
  if (closing_date && new Date(closing_date) < currentDate) {
    return res.status(400).json({ error: 'Closing date cannot be in the past' });
  }

  if (starting_time && ending_time && new Date(starting_time) >= new Date(ending_time)) {
    return res.status(400).json({ error: 'Starting time must be before ending time' });
  }
  if (closing_date && starting_time && new Date(closing_date) >= new Date(starting_time)) {
    return res.status(400).json({ error: 'Closing date must be before starting time' });
  }

  if (places && places[0].length > 0) {
    const trip = await Trip.findByPk(trip_id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const tripStartingTime = starting_time ? new Date(starting_time) : new Date(trip.starting_time);
    const tripEndingTime = ending_time ? new Date(ending_time) : new Date(trip.ending_time);

    for (let place of places) {
      if (new Date(place.time) < tripStartingTime || new Date(place.time) > tripEndingTime) {
        return res.status(400).json({ error: `Place date ${place.time} is out of trip date range` });
      }
    }

    const placeNames = places.map(place => place.place_name);
    const placeRecords = await Place.findAll({
      where: {
        name: placeNames
      }
    });

    const foundPlaceNames = placeRecords.map(record => record.name);
    const notFoundPlaceNames = placeNames.filter(name => !foundPlaceNames.includes(name));

    if (notFoundPlaceNames.length > 0) {
      return res.status(400).json({
        error: 'One or more places not found',
        details: `The following places were not found: ${notFoundPlaceNames.join(', ')}. Please check for typos and try again.`
      });
    }

    req.validatedPlaces = places.sort((a, b) => new Date(a.time) - new Date(b.time));
    req.placeRecords = placeRecords;
  }
  next();
} catch (error) {
  console.error('Failed to validate trip:', error);
  return res.status(500).json({ error: `Internal server error: ${error.message}`, message: 'Failed to validate trip' });
}
};

