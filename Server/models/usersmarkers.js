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
      models.UsersMarkers.belongsTo(models.User, { foreignKey: 'userId' });
      models.UsersMarkers.belongsTo(models.Marker, { foreignKey: 'markerId' });
    }
  };
  UsersMarkers.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    markerId: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'UsersMarkers',
    timestamps: false
  });
  return UsersMarkers;
};
