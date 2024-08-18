'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfilePic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProfilePic.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  ProfilePic.init({
    pic_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    image_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProfilePic',
    tableName: 'profile_pics',
    timestamps: false
  });
  return ProfilePic;
};