'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guest_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  guest_tokens.init({
    token: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'guest_tokens',
    timestamps: false
  });
  return guest_tokens;
};