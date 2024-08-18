'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Place.hasOne(models.City, {foreignKey: 'city_id'});
      Place.hasOne(models.Category, {foreignKey: 'category_id'});
      Place.hasMany(models.PlaceImage, {foreignKey: 'place_id'});
      Place.hasMany(models.trip_path, {foreignKey: 'place_id'});
      
      Place.hasMany(models.favorite_places, {foreignKey: 'place_id'});
      Place.hasMany(models.place_rating, {foreignKey: 'place_id'});
    }
  }
  Place.init({
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    city_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    ar_name: DataTypes.STRING,
    description: DataTypes.STRING,
    ar_description: DataTypes.STRING,
    address: DataTypes.STRING,
    ar_address: DataTypes.STRING,
    location: DataTypes.GEOMETRY('POINT'),
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Place',
    tableName: 'places',
    timestamps: false
  });
  return Place;
};