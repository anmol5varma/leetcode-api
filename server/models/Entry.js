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
      entry.belongsTo(models.section, { foreignKey: 'sectionShortHand', as: 'section' });
    }
  }
  entry.init({
    transactionId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    notes: DataTypes.TEXT,
    quantity: DataTypes.FLOAT,
    totalCost: DataTypes.FLOAT,
    sectionShortHand: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'entry',
  });
  return entry;
};
