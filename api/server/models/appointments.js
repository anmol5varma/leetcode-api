'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  appointments.init({
    appointment_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    location_id: DataTypes.INTEGER,
    appointment_time: DataTypes.DATE,
    no_of_people: DataTypes.INTEGER,
    scan_count: DataTypes.INTEGER,
    checkin_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'appointments',
    updatedAt: false
  });
  return appointments;
};