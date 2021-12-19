'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      models.CompanyNumber.belongsTo(models.User);
      models.CompanyNumber.belongsTo(models.Marker);
    }
  };
  CompanyNumber.init({
    number: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'CompanyNumber',
    timestamps: false
  });
  return CompanyNumber;
};
