const bcrypt = require('bcryptjs');
const Joi = require('joi');
const auth = require('./authController');
const { where, NOW } = require('sequelize');
const mailer = require('../utils/mailer');
const { sequelize, guest_tokens, fcm_tokens } = require('../../db/models');
const { QueryTypes } = require('sequelize');
const User = require('../../db/models').User;
const upload = require('../utils/upload');
const licenceUpload = upload('licences');
const profilePicUpload = upload('profile pictures');
const { type } = require('os');
const { convertStringToNumber } = require('convert-string-to-number');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const userSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email(),
  phone_number: Joi.string().required().pattern(/^\+[1-9]\d{1,14}$/).messages({
    'string.pattern.base': `Phone number must be in a valid international format`,
  }),
  password: Joi.string().required().min(8),
});

exports.registerGuide = async (req, res) => {
  // Handle Image Upload with Multer Middleware
  licenceUpload.single('licenceImage')(req, res, async (err) => {
    if (err) {
      // Handle upload errors (e.g., file size, file type)
      console.error('Error uploading image:', err);
      return res.status(400).json({ error: 'Image upload failed' });
    }

    // Check if the file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // Validate Form Data
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Get Form Data
      const { first_name, last_name, email, phone_number, password } = req.body;

      // Get Image Path
      const licenseImagePath = req.file.path;

      // Check for Duplicate Email and Phone
      const emailExists = await User.findOne({ where: { email } });
      const phoneExists = await User.findOne({ where: { phone_number } });

      if (!emailExists && !phoneExists) {
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create New User
        const user = await sequelize.query(`
          INSERT INTO users (first_name, last_name, email, phone_number, password, role_id, isVerified, isValidated)
          VALUES (:first_name, :last_name, :email, :phone_number, :password, :role_id, :isVerified, :isValidated)
        `, {
          replacements: {
            first_name,
            last_name,
            email,
            phone_number,
            password: hashedPassword,
            role_id: 2,
            isVerified: false,
            isValidated: false
          },
          type: QueryTypes.INSERT
        });

        const userId = user[0];

        console.log(`\n\n\n image path is: ${licenseImagePath}\n\n\n`);
        // Create License Record
        const relativePath = path.relative('public/licences', licenseImagePath);
        const insertLicenseQuery = `
          INSERT INTO licences (user_id, image_path)
          VALUES (:userId, :imagePath)
        `;

        await sequelize.query(insertLicenseQuery, {
          replacements: { userId, imagePath: relativePath },
          type: QueryTypes.INSERT
        });

        res.status(201).json({ message: 'User created successfully! Check your inbox to verify your email.' });
        return mailer.sendCodeEmail(email);

      } else {
        if (emailExists && phoneExists) {
          return res.status(400).json({ error: 'Both email address and phone number already registered' });
        } else if (emailExists) {
          return res.status(400).json({ error: 'Email address already registered' });
        } else {
          return res.status(400).json({ error: 'Phone number already registered' });
        }
      }

    } catch (error) {
      console.error('Failed to register new user:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }); // End of upload.single() middleware
};


  exports.registerUser = async (req, res) => {
    try {
      // Validate input
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const {first_name, last_name, email, phone_number, password} = req.body;

      try {
        // Check for email and phone number duplication
      const emailExists = await User.findOne({ where: { email } });
      const phoneExists = await User.findOne({ where: { phone_number } });
        
        // Check if either email or phone number exists
        if (!emailExists && !phoneExists) {
          console.log("INSIDE THE IF \n\n");

          
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        await User.create({
          first_name,
          last_name,
          email,
          phone_number,
          password: hashedPassword,
          role_id: 3,
          isVerified: false,
          isValidated: true,
        });

        res.status(201).json({message: 'User created successfuly! Check your inbox to verify your email.'});
        return mailer.sendCodeEmail(email);

        } else if(emailExists && phoneExists){
          return res.status(400).json({ error: 'Both email address and phone number already registered'});
        } else if(emailExists){
          return res.status(400).json({ error: 'Email address already registered'});
        } else if(phoneExists){
          return res.status(400).json({error: 'Phone number already registered'});
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to create user' });
      }

    } catch (error) {
      console.error('Failed to register new user:', error);
      return res.status(500).json({ error: 'Failed to register user' });
    }
  };


  
  exports.verifyUser = async (req, res) => {
    try {
      const { code: currentCode, email } = req.body; // Get the user-provided verification code
      
      // Retrieve the stored verification code for the user (from your database)
      const userQuery = 'SELECT user_id FROM users WHERE email = :email';
      const userResult = await sequelize.query(userQuery, {
        replacements: { email },
        type: QueryTypes.SELECT
      });
  
      if (userResult.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const userId = userResult[0].user_id;
  
      const getCodeQuery = 'SELECT code, expiry_date FROM verification_codes WHERE user_id = :userId';
      const userCode = await sequelize.query(getCodeQuery, {
        replacements: { userId },
        type: QueryTypes.SELECT
      });
  
      if (userCode.length === 0) {
        return res.status(404).json({ error: 'Verification code not found' });
      }
  
      const match = currentCode == userCode[0].code;
  
      if (!match) {
        // Verification code doesn't match
        return res.status(400).json({ error: 'Invalid verification code' });
      } else {
        if (userCode[0].expiry_date < new Date()) {
          return res.status(400).json({ error: 'The code you entered has already expired, please request another one' });
        }
  
        const verifyUserQuery = 'UPDATE users SET isVerified = true WHERE user_id = :userId';
        await sequelize.query(verifyUserQuery, {
          replacements: { userId },
          type: QueryTypes.UPDATE
        });
  
        const deleteCodeQuery = 'DELETE FROM verification_codes WHERE user_id = :userId';
        await sequelize.query(deleteCodeQuery, {
          replacements: { userId },
          type: QueryTypes.DELETE
        });
  
        let token = await auth.genToken(email);
  
        // Send success response
        return res.status(200).json({ token: token, message: 'Email verified successfully!', user_id: userId});
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).json({ error: 'Failed to verify email' });
    }
  };
  
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  login_password: Joi.string().required().min(8),
});

exports.loginUser = async (req, res) => {
  try {
    // Validate input
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, login_password } = req.body;

    try {
      // Check for email existence
      const userQuery = `SELECT user_id, password, isVerified, isValidated FROM users WHERE email = :email`;
      const userResult = await sequelize.query(userQuery, {
        replacements: { email },
        type: QueryTypes.SELECT
      });

      if (userResult.length === 0) {
        return res.status(404).json({ error: 'Email address is not registered or wrong' });
      }

      const user = userResult[0];

      const passwordMatch = await bcrypt.compare(login_password, user.password);
      if (!passwordMatch) {
        return res.status(404).json({ message: 'Wrong password or email' });
      }

      if (!user.isVerified) {
        return res.status(400).json({ message: 'User email is not verified, verify the email then try logging in again!' });
      }

      if (!user.isValidated) {
        return res.status(401).json({ message: 'Guide account is not validated yet, wait for the admin to validate it' });
      }

      let token = await auth.genToken(email);
      console.log('logged in successfully!');
      return res.status(200).json({ token: token, message: 'Logged in successfully!', user_id: user.user_id});

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to login' });
    }

  } catch (error) {
    console.error('Failed to login:', error);
    return res.status(500).json({ error: 'Failed to log in' });
  }
};

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  current_password: Joi.string().required().min(8),
  new_password: Joi.string().required().min(8)
});

exports.resetPassword = async (req, res) => {
  try {

    const { error } = resetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { email, current_password, new_password } = req.body;

    // Fetch the user from the database
    const userQuery = `SELECT user_id, password FROM users WHERE email = :email`;
    const userResult = await sequelize.query(userQuery, {
      replacements: { email },
      type: QueryTypes.SELECT
    });

    if (userResult.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult[0];

    // Verify the current password
    const passwordMatch = await bcrypt.compare(current_password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(new_password, 10);

    // Update the user's password in the database
    const updatePasswordQuery = `UPDATE users SET password = :new_password WHERE user_id = :user_id`;
    await sequelize.query(updatePasswordQuery, {
      replacements: { new_password: hashedNewPassword, user_id: user.user_id },
      type: QueryTypes.UPDATE
    });

    // Respond with success
    res.status(200).json({ message: 'Password reset successfully' });
    
  } catch (error) {
    console.error('Failed to reset password:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};



exports.logoutUser = async (req, res) => {
  try {
    const token = req.headers['x-access token'] || req.headers['authorization'];

    if (token) {
      // Blacklist the token in the database
      const blacklistQuery = `INSERT INTO blacklisted_tokens (token) VALUES (:token)`;
      await sequelize.query(blacklistQuery, {
        replacements: { token },
        type: QueryTypes.INSERT
      });
    }

    res.status(200).json({ message: 'Logged out successfully!' });
  } catch (error) {
    console.error('Failed to logout:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
};

const resetNameSchema = Joi.object({
  user_id: Joi.number().required(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional()
});

exports.resetName = async (req, res) => {
  try {
    const { error } = resetNameSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { user_id, first_name, last_name } = req.body;

    if (first_name === null && last_name === null) {
      return res.status(400).json({ message: 'Cannot set both first name and last name to null' });
    }

    const updateData = {};
    if (first_name !== undefined) {
      updateData.first_name = first_name;
    }
    if (last_name !== undefined) {
      updateData.last_name = last_name;
    }

    await User.update(updateData, { where: { user_id } });

    res.status(201).json({ message: 'Name reset successfully!' });
  } catch (error) {
    console.error('Failed to reset name:', error);
    res.status(500).json({ error: 'Failed to reset name' });
  }
};

const resetEmailSchema = Joi.object({
  user_id: Joi.number().required(),
  new_email: Joi.string().email().required()
});


exports.resetEmail = async (req, res) => {
  try {

    const { error } = resetEmailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { user_id, new_email } = req.body;
    const emailExists = await User.findOne({ where: { email: new_email } });

    if (!emailExists) {
      await User.update({ email: new_email, isVerified: false }, { where: { user_id } });
      res.status(201).json({ message: 'Email reset successfully! Check your inbox to verify your new email.' });
      return mailer.sendCodeEmail(new_email);
    }

    return res.status(400).json({ message: 'Email already registered' });
  } catch (error) {
    console.error('Failed to reset email:', error);
    res.status(500).json({ error: 'Failed to reset email' });
  }
};

const resetPhoneSchema = Joi.object({
  user_id: Joi.number().required(),
  phone_number: Joi.string().required().pattern(/^\+[1-9]\d{1,14}$/).messages({
    'string.pattern.base': `Phone number must be in a valid international format`,
  }),
});


exports.resetPhone = async (req, res) => {
  try {

    const { error } = resetPhoneSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { user_id, phone_number } = req.body;
    const phoneExists = await User.findOne({ where: { phone_number: phone_number } });

    if (!phoneExists) {
      await User.update({ phone_number: phone_number }, { where: { user_id } });
      return res.status(200).json({ message: 'Phone number reset successfully!' });
    }

    return res.status(400).json({ message: 'Phone number already registered' });
  } catch (error) {
    console.error('Failed to reset phone number:', error);
    res.status(500).json({ error: 'Failed to reset phone number' });
  }
};

const profileSchema = Joi.object({
  user_id: Joi.number().required()
});

exports.uploadProfilePic = async (req, res) => {
  profilePicUpload.single('profileImage')(req, res, async (err) => {
    if (err) {
      console.error('Error uploading image:', err);
      return res.status(400).json({ error: 'Image upload failed' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const { error } = profileSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      let { user_id } = req.body;
      user_id = convertStringToNumber(user_id);

      const profileImagePath = req.file.path;
      const relativePath = path.relative('public/profile pictures', profileImagePath);

      // Check if a profile picture already exists for the user
      const [existingProfilePic] = await sequelize.query(
        `SELECT image_path FROM profile_pics WHERE user_id = :user_id`, 
        { replacements: { user_id }, type: QueryTypes.SELECT }
      );

      if (existingProfilePic) {
        // Delete the old profile picture file
        const oldImagePath = path.join('public/profile pictures', existingProfilePic.image_path);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }

        // Update the existing record with the new image path
        await sequelize.query(
          `UPDATE profile_pics SET image_path = :imagePath WHERE user_id = :user_id`,
          { replacements: { user_id, imagePath: relativePath }, type: QueryTypes.UPDATE }
        );

        return res.status(200).json({ message: 'Profile picture updated successfully!' });
      } else {
        // Insert a new record if no previous image exists
        await sequelize.query(
          `INSERT INTO profile_pics (user_id, image_path) VALUES (:user_id, :imagePath)`,
          { replacements: { user_id, imagePath: relativePath }, type: QueryTypes.INSERT }
        );

        return res.status(201).json({ message: 'Profile picture uploaded successfully!' });
      }
    } catch (error) {
      console.error('Failed to upload profile picture:', error);
      res.status(500).json({ error: 'Failed to upload profile picture' });
    }
  });
};

exports.loginGuest = async (req, res) => {
  try {
    const trivialEmail = Date.now() + '@email.com';
    console.log(trivialEmail);
    const token = auth.genToken(trivialEmail);

    console.log("\n\n\nGuest session launched successfully\n\n\n");
    await guest_tokens.create({token:'Bearer '+  token});
    return res.status(201).json({message: 'Guest session launched successfully', token: token});
  } catch (error) {
    
    console.error('Failed to login guest:', error);
    res.status(500).json({ error: 'Failed to login as guest' });
  }
};

exports.fcmToken = async (req, res) => {
  const user_id = req.body.user_id;
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ message: 'no token' });
  }

  try {
    // Check if the token already exists for the user
    const existingToken = await fcm_tokens.findOne({ where: { user_id, token } });

    if (existingToken) {
      // Token already exists, do nothing
      return res.status(200).json({ message: 'token already exists' });
    }

    // Create a new token
    await fcm_tokens.create({
      user_id, token
    });

    return res.status(200).json({ message: 'success token' });
  } catch (error) {
    console.error('Error creating token:', error);
    return res.status(500).json({ message: 'internal server error' });
  }
};

//TODO to be continued
/* exports.deleteAccount = async (req, res) => {
  try {
    const token = req.headers['x-access token'] || req.headers['authorization'];
    const id = req.params.id;


    //following lines for auto delete from a table
    const { Op } = require('sequelize');

await ExampleTable.destroy({
    where: {
        createdAt: {[Op.lte]: new Date(Date.now() - (60*60*24*1000))}
    }
});

    if (token) {
      // Blacklist the token in the database
      const blacklistQuery = `INSERT INTO blacklisted_tokens (token) VALUES (:token)`;
      await sequelize.query(blacklistQuery, {
        replacements: { token },
        type: QueryTypes.INSERT
      });
    }

    await User.destroy({where: {user_id: id}});
    return res.status(200).json({message: 'deleted account successfully'})
  } catch (error) {
    console.error('Failed to delete account:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
} */