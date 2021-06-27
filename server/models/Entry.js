'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      entry.belongsTo(models.section)
    }
  };
  entry.init({
    name: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    totalCost: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'entry',
  });
  return entry;
};