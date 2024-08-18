'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trip.hasMany(models.trip_path, {foreignKey: 'trip_id'});
      Trip.belongsTo(models.User, {foreignKey: 'guide_id'});
      
      Trip.hasMany(models.booked_trip, {foreignKey: 'trip_id'});
    }
  }
  Trip.init({
    trip_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    guide_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    ar_name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    info: DataTypes.STRING,
    ar_info: DataTypes.STRING,
    starting_time: DataTypes.DATE,
    ending_time: DataTypes.DATE,
    gathering_place: DataTypes.STRING,
    ar_gathering_place: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    closing_date: DataTypes.DATE,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trip',
    tableName: 'trips',
    timestamps: false
  });
  return Trip;
};