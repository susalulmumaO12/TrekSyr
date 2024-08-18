'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class place_rating_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  place_rating_comment.init({
    comment_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    rate_id: DataTypes.INTEGER,
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'place_rating_comment',
    tableName: 'place_rating_comments',
    timestamps: false
  });
  return place_rating_comment;
};