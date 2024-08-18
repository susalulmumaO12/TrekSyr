'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Licence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Licence.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Licence.init({
    Licence_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    image_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Licence',
    tableName: 'licences',
    timestamps: false
  });
  return Licence;
};