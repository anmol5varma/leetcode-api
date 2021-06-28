const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      section.hasMany(models.entry, { as: 'entries' });
    }
  }
  section.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    shortHand: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'section',
  });
  return section;
};
