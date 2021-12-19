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
      models.Marker.hasMany(models.UsersMarkers);
      models.Marker.hasOne(models.CompanyNumber);
    }
  };
  Marker.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    storeName: DataTypes.STRING,
    address: DataTypes.STRING,
    callNum: DataTypes.STRING,
    tagName: DataTypes.STRING,
    description: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Marker',
    timestamps: false
  });
  return Marker;
};
