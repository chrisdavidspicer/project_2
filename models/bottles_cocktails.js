'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bottles_cocktails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bottles_cocktails.init({
    bottleId: DataTypes.INTEGER,
    cocktailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bottles_cocktails',
  });
  return bottles_cocktails;
};