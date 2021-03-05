'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bottle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.bottle.belongsToMany(models.user, { through: 'users_bottles'})
      // models.bottle.belongsToMany(models.cocktail, { through: 'bottles_cocktails'})
    }
  };
  bottle.init({
    type: DataTypes.STRING,
    img_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'bottle',
  });
  return bottle;
};