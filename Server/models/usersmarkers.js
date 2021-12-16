'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersMarkers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  UsersMarkers.init({
    userId: DataTypes.INTEGER,
    markerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersMarkers',
    timestamps: false
  });
  return UsersMarkers;
};
