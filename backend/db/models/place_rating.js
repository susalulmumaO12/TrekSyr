'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class place_rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      place_rating.belongsTo(models.User, {foreignKey: 'user_id'});
      place_rating.belongsTo(models.Place, {foreignKey: 'place_id'});
    }
  }
  place_rating.init({
    rate_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER,
    rate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'place_rating',
    tableName: 'place_ratings',
    timestamps: false
  });
  return place_rating;
};