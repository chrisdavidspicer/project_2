'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cocktail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.cocktail.belongsToMany(models.user, { through: 'users_cocktails'})
      models.cocktail.belongsToMany(models.bottle, { through: 'bottles_cocktails'})
      models.cocktail.hasMany(models.rating)
      models.cocktail.hasMany(models.comment)
    }
  };
  cocktail.init({
    name: DataTypes.STRING,
    img_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'cocktail',
  });
  return cocktail;
};