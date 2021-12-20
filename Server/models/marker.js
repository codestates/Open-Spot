'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Marker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      models.Marker.belongsTo(models.User);
      models.User.hasMany(models.UsersMarkers);
    }
  };
  Marker.init({
    storeName: DataTypes.STRING,
    address: DataTypes.STRING,
    callNum: DataTypes.STRING,
    tagName: DataTypes.STRING,
    description: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Marker'
  });
  return Marker;
};
