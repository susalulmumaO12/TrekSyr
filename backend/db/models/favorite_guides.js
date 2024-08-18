'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite_guides extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favorite_guides.belongsTo(models.User, {foreignKey: 'user_id'});
      favorite_guides.belongsTo(models.User, {foreignKey: 'guide_id'});
    }
  }
  favorite_guides.init({
    fav_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    guide_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favorite_guides',
    tableName: 'favorite_guides',
    timestamps: false
  });
  return favorite_guides;
};