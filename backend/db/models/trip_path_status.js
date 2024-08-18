'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip_path_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trip_path_status.belongsTo(models.trip_path, {foreignKey: 'trip_path_id'});
    }
  }
  trip_path_status.init({
    status_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    trip_path_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'trip_path_status',
    tableName: 'trip_path_statuses',
    timestamps: false
  });
  return trip_path_status;
};