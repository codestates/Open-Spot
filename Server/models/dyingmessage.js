'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DyingMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  DyingMessage.init({
    userName: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DyingMessage',
    freezeTableName: true
  });
  return DyingMessage;
};
