'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite_places extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favorite_places.belongsTo(models.User, {foreignKey: 'user_id'});
      favorite_places.belongsTo(models.Place, {foreignKey: 'place_id'});
    }
  }
  favorite_places.init({
    fav_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favorite_places',
    tableName: 'favorite_places',
    timestamps: false
  });
  return favorite_places;
};