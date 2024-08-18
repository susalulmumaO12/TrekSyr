'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booked_trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      booked_trip.belongsTo(models.User, {foreignKey: 'user_id'});
      booked_trip.belongsTo(models.Trip, {foreignKey: 'trip_id'});
    }
  }
  booked_trip.init({
    booked_trip_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
    trip_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    paymentIntentId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'booked_trip',
    tableName: 'booked_trips',
  });
  return booked_trip;
};