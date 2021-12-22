'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      models.Images.belongsTo(models.Marker);
    }
  };
  Images.init({
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    fileAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    markerId: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Images',
    timestamps: false
  });
  return Images;
};
