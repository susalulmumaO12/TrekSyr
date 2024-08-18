'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerificationCode extends Model {
    static associate(models) {
      VerificationCode.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  VerificationCode.init({
    code_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    code: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    expiry_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'VerificationCode',
    tableName: 'verification_codes',
    timestamps: false,
  });
  return VerificationCode;
};
