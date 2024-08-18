const Joi = require('joi');
const mailer = require('../utils/mailer');
const { sequelize } = require('../../db/models');
const { User } = require('../../db/models');
const { QueryTypes } = require('sequelize');
const upload = require('../utils/upload');
const { imageConvert } = require('../utils/base64Image');
const { p_imageConvert } = require('../utils/base64Image');
const fs = require('fs');
const path = require("node:path");
require('dotenv').config();


const validateSchema = Joi.object({
  user_id: Joi.number().required()
});

exports.validateGuide = async (req, res, next) => {
  try {
      const { user_id } = req.body;
      
      console.log(`\n\n\nuser id is : ${user_id}\n\n\n`);
      const { error } = validateSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const user = await User.findByPk(user_id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      if (user.role_id !== 2) {
          return res.status(400).json({ error: 'User is not a guide' });
      }

      next(); // If checks pass, continue to the next middleware or route handler
  } catch (error) {
      return res.status(500).json({ error: 'Error validating user' });
  }
};

exports.acceptGuide = async (req, res) => {

    try {

        const { user_id } = req.body;
        // Update the user's isValidated status in the database
        const updateQuery = `UPDATE users SET isValidated = true WHERE user_id = :user_id`;
        await sequelize.query(updateQuery, {
          replacements: { user_id },
          type: QueryTypes.UPDATE
        });

        let user = await sequelize.query(`SELECT email FROM users WHERE user_id = :user_id`, {replacements: {user_id}});
        console.log(`\n\n\nemail is : ${user.email}`);
    
        mailer.sendValidationEmail(user[0][0].email, true);
        return res.status(200).json({ message: 'Guide validated successfully' });
        
      } catch (error) {
        console.error('Failed to update user validation status:', error);
        return res.status(500).json({ error: 'Failed to update user validation status' });
      }

};

exports.rejectGuide = async (req, res) => {

    try {
      
        const { user_id } = req.body;
        console.log(`\n\n\nuser id is : ${user_id}\n\n\n`);
        let user = await sequelize.query(`SELECT email FROM users WHERE user_id = :user_id`, {replacements: {user_id}});
        console.log(`\n\n\nemail is : ${user.email}`);
    
        // Update the user's isValidated status in the database
        const licencesQuery = `DELETE FROM licences WHERE user_id = :user_id`;
        await sequelize.query(licencesQuery, {
          replacements: { user_id },
          type: QueryTypes.DELETE
        });

        const userQuery = `DELETE FROM users WHERE user_id = :user_id`;
        await sequelize.query(userQuery, {
          replacements: { user_id },
          type: QueryTypes.DELETE
        });
    
        //temporarily stopped emails
        //mailer.sendValidationEmail(user[0][0].email, false);
        return res.status(200).json({ message: 'Guide rejected successfully' });
      } catch (error) {
        console.error('Failed to update user validation status:', error);
        return res.status(500).json({ error: 'Failed to update user validation status' });
      }

};


exports.guides = async (req, res) => {
  try {

    
    const allGuidesQuery = `SELECT u.user_id AS guide_id, u.first_name, u.last_name, p.image_path as image FROM trek.users u LEFT JOIN profile_pics p ON u.user_id = p.user_id WHERE role_id = 2 AND isValidated = true`;
    const guides = await sequelize.query(allGuidesQuery);
  
    if(guides[0].length != 0) {
    // Modify the guide data to include the image
    guidesWimages = imageConvert(guides);

    return res.status(200).send(guidesWimages[0]);
  } else {
    return res.status(404).json({message: "There are no guides registered in the system."});
  }
  } catch (error) {
    if(error) {
      return res.status(500).json({error: error, message: "Failed to fetch guides"});
    }
  }
};

exports.guide = async (req, res) => {

    try {
      const id = req.params.id;
  
      const guideQuery = `SELECT u.first_name, u.last_name, u.email, u.phone_number, u.isValidated, p.image_path AS p_image, l.image_path as image FROM trek.users u LEFT JOIN licences l ON u.user_id = l.user_id LEFT JOIN profile_pics p ON u.user_id = p.user_id WHERE u.user_id = :id AND u.role_id = 2`;
      const guide = await sequelize.query(guideQuery, {
          replacements: {id}
      });
  console.log(guide);
      if (guide[0].length != 0) {
        // image_path is a relative path from the 'public' directory 
        
        guidesWimage = p_imageConvert(guide);
        guidesWimage = imageConvert(guide);

        return res.status(200).send(guidesWimage[0][0]);
      } else {
        return res.status(404).json({message: "There is no guide with such id"});
      }
    } catch (error) {
      if(error) {
        return res.status(500).json({error: error, message: "Failed to fetch guide"});
      }
    }
};

exports.invalidGuides = async (req, res) => {
  try {
    const invalidQuery = `SELECT u.user_id AS guide_id, u.first_name, u.last_name FROM trek.users u WHERE role_id = 2 AND isValidated = false`;
    const guides = await sequelize.query(invalidQuery);
  
    if(guides[0].length != 0) {

    return res.status(200).send(guides[0]);
  } else {
    return res.status(404).json({message: "There are no guide requests"});
  }
  } catch (error) {
    if(error) {
      return res.status(500).json({error: error, message: "Failed to fetch guides"});
    }
  }
};