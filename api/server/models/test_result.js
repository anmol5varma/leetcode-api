'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class test_result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  test_result.init({
    tt_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    ts_id: DataTypes.STRING,
    is_positive: DataTypes.BOOLEAN,
    result_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'test_result',
  });
  return test_result;
};