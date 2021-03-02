'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_bottles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users_bottles.init({
    userId: DataTypes.INTEGER,
    bottleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_bottles',
  });
  return users_bottles;
};