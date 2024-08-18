'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blacklisted_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blacklisted_tokens.init({
    token: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'blacklisted_tokens',
  });
  return blacklisted_tokens;
};