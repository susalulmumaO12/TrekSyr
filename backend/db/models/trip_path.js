'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip_path extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trip_path.belongsTo(models.Trip, {foreignKey: 'trip_id'});
      trip_path.belongsTo(models.Place, {foreignKey: 'place_id'});

      
      trip_path.hasMany(models.trip_path_status, {foreignKey: 'trip_path_id'});
    }
  }
  trip_path.init({
    trip_path_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    trip_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'trip_path',
    tableName: 'trip_paths',
    timestamps: false
  });
  return trip_path;
};