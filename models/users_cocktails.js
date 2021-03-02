'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_cocktails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users_cocktails.init({
    userId: DataTypes.INTEGER,
    cocktailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_cocktails',
  });
  return users_cocktails;
};