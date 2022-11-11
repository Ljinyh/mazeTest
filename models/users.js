'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

    static associate(models) {
      // define association here
    }
  }
  Users.init({
    user_phone: DataTypes.INTEGER,
    AD_check: DataTypes.TINYINT,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};