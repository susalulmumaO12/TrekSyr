'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaceImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlaceImage.hasOne(models.Place, {foreignKey: 'place_id'});
    }
  }
  PlaceImage.init({
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    place_id: DataTypes.INTEGER,
    image_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PlaceImage',
    tableName: 'place_images',
    timestamps: false
  });
  return PlaceImage;
};