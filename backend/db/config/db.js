require('dotenv').config(); 

const mysql = require("mysql2/promise");


const {Sequelize, DataTypes} = require("sequelize");

/* const sequelize = new Sequelize( 'trek', 'trekDB', 'SsSsSs1111', {
       host: '127.0.0.1',
       dialect: 'mysql',
       logging: true
     }
   );
   try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
 */
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

/* const db = await mysql.createConnection({
    connectionLimit: 100,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
 });
 */

 
 module.exports = db = {};

 initialize();

 async function initialize() {
     // create db if it doesn't already exist
     const connection = await mysql.createConnection({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASSWORD });
     await connection.query(`CREATE DATABASE IF NOT EXISTS trek;`);
 
     // connect to db
     const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, { dialect: 'mysql' });
 
     
     // sync all models with database
     await sequelize.sync();
 }
