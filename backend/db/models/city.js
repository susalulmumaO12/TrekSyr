'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      City.hasMany(models.Place, {foreignKey: 'city_id'});
    }
  }
  City.init({
    city_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    arabic_name: DataTypes.STRING,
    location: DataTypes.GEOMETRY('POINT')
  }, {
    sequelize,
    modelName: 'City',
    timestamps: false,
    tableName: 'cities'
  });
  return City;
};