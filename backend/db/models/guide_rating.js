'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guide_rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      guide_rating.belongsTo(models.User, {foreignKey: 'guide_id', as: 'rated'});
      guide_rating.belongsTo(models.User, {foreignKey: 'user_id', as: 'rater'});
      guide_rating.hasOne(models.guide_rating_comment, {foreignKey: 'guide_rating_id'});
    }
  }
  guide_rating.init({
    guide_rating_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    guide_id: DataTypes.INTEGER,
    rate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'guide_rating',
    tableName: 'guide_ratings',
    timestamps: false
  });
  return guide_rating;
};