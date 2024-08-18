const jwt = require('jsonwebtoken');
const { sequelize } = require('../../db/models');
const { guest_tokens } = require('../../db/models');
require('joi');


exports.genToken = (email) => {

    console.log(`user id is \n ${email}`);
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
    time: Date(),
    email: email,
    };

    const token = jwt.sign(data, `${jwtSecretKey}`, {expiresIn: '15d'});

    return token;
};

exports.random = (req, res) => {
    return res.status(222);
}
exports.verToken = (req, res) => {
    try {
      // Simply call verifyToken
      this.verifyToken(req, res, next); 
    } catch (error) {
      // Handle any errors that might occur during verification
      console.error('Failed to verify token:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  };

exports.verifyToken = async (req, res, next) => {
    
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
 
    try {
        let token = req.headers['x-access token'] || req.headers['authorization'] || 'unavailabe';
 
        console.log(req.headers);
        
        const tokenQuery = `SELECT * FROM blacklisted_tokens WHERE token = :token`;

        let tokenResult = sequelize.query(tokenQuery, {
            replacements: {token: token}
        });

        console.log(`token result: ${tokenResult[0]}`);
        if(tokenResult[0] != undefined){
            return res.status(401).json({message: 'Token either expired or you logged out, you need to log in again.'})
        }
        
        if(token != 'unavailabe'){
            if(token.startsWith('Bearer ')){
                token = token.slice(7, token.length);
            }
            const verified = jwt.verify(token, jwtSecretKey, (err, decoded) => {
            if(err){
                return res.status(401).json({success: false, message: `invalid token`});
            } else {
                req.decoded = decoded;
                next();
            }
        });
        } else {
            return res.json({success: false, message: 'invalid token'});
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
};

exports.checkGuest = async (req, res, next) => {
    const token = req.header('Authorization');

    console.log("is guest??")
    try {

        const isGuest = await guest_tokens.findOne({ where: { token: token } });

        if (isGuest) {
            console.log('yes a guest');
            return res.status(401).json({ message: 'You need to log in before performing this action' });
        }
        console.log('not a guest');
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};