'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Place, {foreignKey: 'category_id'});
    }
  }
  Category.init({
    category_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    arabic_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: false
  });
  return Category;
};