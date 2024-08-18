const nodemailer = require('nodemailer');
const { QueryTypes } = require('sequelize');
const { sequelize, User } = require('../../db/models');
const mysql = require('mysql');
const db = require('../../db/config/db');
const { date } = require('joi');
const bcrypt = require('bcryptjs');

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }

    
var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "fawal.salma@gmail.com",
    pass: process.env.GMAIL_APP_PASS
  }
});


transport.verify().then(console.log).catch(console.error);

exports.sendCode = async (req, res) => {
    try {
        const email = req.body.email;
        await this.sendCodeEmail(email);
        return res.status(200).json({message: "The verification code is sent to your inbox!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to send code, please try again."});
    }
};



exports.sendCodeEmail = async (email) => {
  try {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const getUserIdQuery = 'SELECT user_id, first_name, last_name FROM users WHERE email = :email';

    let userResult = await sequelize.query(getUserIdQuery, {
      replacements: { email },
      type: QueryTypes.SELECT
    });

    console.log(`\n\n\n Verification code is: ${verificationCode}\n\n\n`);

    if (userResult.length === 0) {
      throw new Error('User not found');
    }

    const userId = userResult[0].user_id;

    const checkExistQuery = 'SELECT code FROM verification_codes WHERE user_id = :userId';
    const codeExists = await sequelize.query(checkExistQuery, {
      replacements: { userId },
      type: QueryTypes.SELECT
    });

    const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

    if (codeExists.length === 0) {
      const addUserCodeQuery = `
        INSERT INTO verification_codes (code, user_id, expiry_date) 
        VALUES (:code, :userId, :expiryDate)
      `;
      await sequelize.query(addUserCodeQuery, {
        replacements: { code: verificationCode, userId, expiryDate },
        type: QueryTypes.INSERT
      });
      console.log('Added new verification code.');
    } else {
      const updateUserCodeQuery = `
        UPDATE verification_codes SET code = :code, expiry_date = :expiryDate 
        WHERE user_id = :userId
      `;
      await sequelize.query(updateUserCodeQuery, {
        replacements: { code: verificationCode, expiryDate, userId },
        type: QueryTypes.UPDATE
      });
      console.log('Updated verification code.');
    }

    const mailOptions = {
      from: 'fawal.salma@gmail.com',
      to: email,
      subject: 'Verify Your Email',
      text: `Your verification code is: ${verificationCode}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verification Code</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 50px auto;
    background-color: #fff;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .header {
    background-color: #007bff;
    color: #ffffff;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .code {
    font-size: 24px;
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    display: inline-block;
  }
  .footer {
    margin-top: 20px;
    font-size: 12px;
    color: #888;
  }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>Email Verification</h1>
  </div>
  <p>Hi there,</p>
  <p>Thank you for registering with us. Please enter the following verification code to complete your registration:</p>
  <h2 id="code"> ${verificationCode}</h2>
  <p>If you did not request this code, please ignore this email.</p>
  <h4>This code expires in one hour</h4>
  <div class="footer">
    <p>© 2024 TrekSyr. All rights reserved.</p>
  </div>
</div>
</body>
</html>


`
    };

    return transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending verification email:', error);
      } else {
        console.log('Verification email sent:', info.response, info.envelope);
      }
    });

  } catch (error) {
    console.error('Error sending verification code:', error);
  }
};

exports.sendPassword = async (req, res) => {
  try {
      const email = req.body.email;
      await this.sendPasswordEmail(email);
      return res.status(200).json({message: "The new password is sent to your inbox! Please change your password once you log in!"});
  } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Failed to send new password, please try again."});
  }
};


exports.sendPasswordEmail = async (email) => {
  try {
    // Generate a new password
    const newPassword = Math.floor(10000000 + Math.random() * 90000000).toString();

    console.log(`\n\n\nemail for pass reset is: ${email}\n\n\n`);

    const userResult = await User.findOne({where: {email: email}});

    if (!userResult) {
      throw new Error('user not found');
    }

    const userId = userResult.user_id;

    console.log(`\n\n\npassword is: ${newPassword}\n\n\n`);
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const resetPassQuery = `UPDATE users SET password = :hashedPassword WHERE user_id = :userId`;
    await sequelize.query(resetPassQuery, {
      replacements: { hashedPassword, userId },
      type: QueryTypes.UPDATE
    });

    // Set up email options
    const mailOptions = {
      from: 'trekSyr@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Your new password is: ${newPassword}`
    };

    // Send the email
    await transport.sendMail(mailOptions);

  } catch (error) {
    console.error('Error sending password reset code:', error);
    throw new Error('Failed to send password reset email');
  }
};

exports.sendEmail = async (req, res) => {
  try {
      const email = req.body.email;
      const accept = req.body.accept;
      await this.sendValidationEmail(email, accept);
      return res.status(200).json({message: "The verification code is sent to your inbox!"});
  } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Failed to send code, please try again."});
  }
};

exports.sendValidationEmail =  async (email, isValidated) => {
  try {

    let mailOptions;

    if(isValidated){
      mailOptions = {
        from: 'fawal.salma@gmail.com',
        to: email,
        subject: 'Guide account validated!',
        text: `You can now plan trips as a certified guide!`
      };
    } else {
      mailOptions = {
        from: 'fawal.salma@gmail.com',
        to: email,
        subject: 'Guide account is not validated',
        text: `Your account is no longer registered in the system because you didn't meet our standards`
      };
    }
    // Send the email
    await transport.sendMail(mailOptions);

  } catch (error) {
    console.error('Error sending pvalidation email:', error);
    throw new Error('Failed to validation email');
  }
};