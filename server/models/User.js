const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    location_id: DataTypes.INTEGER,
    salt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    updatedAt: false
  });
  return User;
};