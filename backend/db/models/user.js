'use strict';
const {
  Model
} = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
const { User } = require('textmagic-rest-client/resources');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {foreignKey: 'role_id'});

      User.hasOne(models.VerificationCode, {foreignKey: 'user_id'});

      User.hasOne(models.Licence, {foreignKey: 'user_id'});

      User.hasMany(models.ProfilePic, {foreignKey: 'user_id'});

      User.hasMany(models.Trip, {foreignKey: 'guide_id'});
      
      User.hasMany(models.favorite_places, {foreignKey: 'user_id'});
      User.hasOne(models.place_rating, {foreignKey: 'user_id'});

      User.hasMany(models.favorite_guides, {foreignKey: 'user_id'});
      User.hasMany(models.favorite_guides, {foreignKey: 'guide_id'});

      User.hasMany(models.guide_rating, {foreignKey: 'user_id', as: 'rater'});
      User.hasMany(models.guide_rating, {foreignKey: 'guide_id', as: 'rated'});

      User.hasMany(models.booked_trip, {foreignKey: 'user_id'});
      
      User.hasMany(models.fcm_tokens, {foreignKey: 'user_id'});
    }
  }
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    isVerified: DataTypes.BOOLEAN,
    isValidated: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  });
  return User;
};

